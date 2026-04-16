require("dotenv").config();

module.exports = {
  baseUrl: process.env.BASE_URL || "http://lojaebac.ebaconline.art.br",
  requestTimeout: Number(process.env.REQUEST_TIMEOUT || 30000),
  authToken: process.env.API_AUTH_TOKEN || "",
  basicUser: process.env.API_BASIC_USER || "admin_ebac",
  basicPass: process.env.API_BASIC_PASS || "@admin!&b@c!2022",
  existingCouponId: Number(process.env.EXISTING_COUPON_ID || 1)
};
