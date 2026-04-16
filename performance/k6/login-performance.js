import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

const users = new SharedArray("ebac-users", function () {
  return JSON.parse(open("./data/users.json"));
});

export const options = {
  scenarios: {
    login_load: {
      executor: "ramping-vus",
      stages: [
        { duration: "20s", target: 20 },
        { duration: "1m40s", target: 20 }
      ],
      gracefulRampDown: "0s"
    }
  },
  thresholds: {
    http_req_duration: ["p(95)<4000"],
    http_req_failed: ["rate<0.10"],
    checks: ["rate>0.90"]
  }
};

export default function () {
  const user = users[__VU % users.length];

  const payload = {
    username: user.username,
    password: user.password,
    login: "Login"
  };

  const response = http.post(
    "http://lojaebac.ebaconline.art.br/minha-conta/",
    payload,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      redirects: 0
    }
  );

  check(response, {
    "status esperado para login": (r) => [200, 302, 303].includes(r.status),
    "resposta abaixo de 4s": (r) => r.timings.duration < 4000
  });

  sleep(1);
}
