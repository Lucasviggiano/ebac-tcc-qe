import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

const baseUrl = __ENV.BASE_URL || "http://lojaebac.ebaconline.art.br";

const users = new SharedArray("ebac-users-catalog", function () {
  return JSON.parse(open("./data/users.json"));
});

export const options = {
  scenarios: {
    catalog_load: {
      executor: "ramping-vus",
      stages: [
        { duration: "20s", target: 20 },
        { duration: "1m40s", target: 20 }
      ],
      gracefulRampDown: "0s"
    }
  },
  thresholds: {
    http_req_duration: ["p(95)<4500"],
    http_req_failed: ["rate<0.10"],
    checks: ["rate>0.90"]
  }
};

export default function () {
  const user = users[__VU % users.length];

  const catalogResponse = http.get(`${baseUrl}/produtos/`);

  check(catalogResponse, {
    "catalogo responde com sucesso": (r) => r.status === 200,
    "catalogo abaixo de 4.5s": (r) => r.timings.duration < 4500,
    "catalogo contem html": (r) => typeof r.body === "string" && r.body.includes("product")
  });

  const accountResponse = http.post(
    `${baseUrl}/minha-conta/`,
    {
      username: user.username,
      password: user.password,
      login: "Login"
    },
    { headers: { "Content-Type": "application/x-www-form-urlencoded" }, redirects: 0 }
  );

  check(accountResponse, {
    "endpoint de conta responde": (r) => [200, 302, 303].includes(r.status)
  });

  sleep(1);
}
