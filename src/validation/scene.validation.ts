import { body } from 'express-validator'
import validation from './validationMiddleware'


const userValidation = [
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
  validation
]

export default { userValidation }

