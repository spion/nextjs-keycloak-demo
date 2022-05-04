// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {jwtMiddleware} from '../../helpers/api/jwt-middleware'

export default async function handler(req, res) {
  try {
    await jwtMiddleware(req, res)
    res.status(200).json({ name: 'John Doe' })
  } catch (e) {
    if(e.name === 'UnauthorizedError') {
      console.error(e);
      return res.status(401).json({error: 'You cant do that'});
    }
    else {
      throw e;
    }
  }
}
