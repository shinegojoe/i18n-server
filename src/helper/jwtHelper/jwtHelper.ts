import JWT from 'jsonwebtoken'


const secret = process.env['SECRET'] as string

export type Payload = {
  email: string
  iat: number
  exp: number
}


export const generateJWT = (opt: object) =>{
  const jwt = JWT.sign(opt, secret, { expiresIn: 60 * 60 })
  return jwt
}


export const verifyJWT = (jwt: string): Payload => {
  // token expired return error 
  try {
    const decoded = JWT.verify(jwt, secret) as Payload
    return decoded
  } catch(e) {
    throw Error('jwt error')
  }
    
}
