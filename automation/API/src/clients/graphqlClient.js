const request = require('supertest')
const env = require('../config/env')
const routes = require('../config/routes')

const api = request(env.baseUrl)

async function graphqlRequest({ query, variables = {}, token = env.authToken }) {
  const req = api
    .post(routes.graphql)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      query,
      variables
    })

  if (token) {
    req.set('Authorization', `Bearer ${token}`)
  }

  return req
}

module.exports = {
  api,
  env,
  routes,
  graphqlRequest
}