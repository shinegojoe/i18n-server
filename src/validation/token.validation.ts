import { Request, Response, NextFunction} from 'express'
import { verifyJWT } from '../helper/jwtHelper/jwtHelper'

const tokenValidation = (req: Request, res: Response, next: NextFunction)=> {
  console.log('check token')
  const user = verifyJWT(req.body.token)
  if(user.email !== req.body.email) {
    next(Error('token validaion fail'))
  }
 
  next()
}

export default tokenValidation