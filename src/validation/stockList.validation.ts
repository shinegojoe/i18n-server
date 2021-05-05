import { body } from 'express-validator'
import validation from './validationMiddleware'


const stockListValidation = [
  body('category').isString(),
  body('code').isString(),
  body('name').isString(),
  validation
]

export default { stockListValidation }