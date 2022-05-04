const expressJwtJwks = require('express-jwt-jwks')
const util = require('util')
// import getConfig from 'next/config';

// const { serverRuntimeConfig } = getConfig();

const middleware = expressJwtJwks({
  jwks: 'http://localhost:8081/realms/demo/protocol/openid-connect/certs',
})

function jwtMiddleware(req, res) {
  return new Promise((resolve, reject) => {
    middleware(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export { jwtMiddleware }
