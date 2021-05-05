import { Response, Request, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

const validation = (req: Request, res: Response, next: NextFunction) => {
  console.log("qqq")
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next()
  } else {
    // const err = errors.array()[0]
    throw new Error("validation err")
    
  }
}

export default validation