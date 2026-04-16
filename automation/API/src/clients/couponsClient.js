const request = require("supertest");
const env = require("../config/env");
const routes = require("../config/routes");

const api = request(env.baseUrl);

function withBasicAuth(req, user = env.basicUser, pass = env.basicPass) {
  return req.auth(user, pass);
}

function listCoupons(query = {}) {
  return withBasicAuth(api.get(routes.coupons).query(query).timeout({ response: env.requestTimeout }));
}

function getCouponById(id) {
  return withBasicAuth(
    api.get(`${routes.coupons}/${id}`).timeout({ response: env.requestTimeout })
  );
}

function createCoupon(payload) {
  return withBasicAuth(
    api
      .post(routes.coupons)
      .set("Content-Type", "application/json")
      .send(payload)
      .timeout({ response: env.requestTimeout })
  );
}

function listCouponsWithInvalidAuth() {
  return api
    .get(routes.coupons)
    .auth(`${env.basicUser}_invalid`, "wrong_password")
    .timeout({ response: env.requestTimeout });
}

module.exports = {
  api,
  env,
  routes,
  listCoupons,
  getCouponById,
  createCoupon,
  listCouponsWithInvalidAuth
};
