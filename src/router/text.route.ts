import express from 'express'
import textController from '../controller/text.controller'
const router = express.Router()

const textString = '/text'
router.get(`${textString}/:id`, (req, res, next)=> {
  textController.get(req, res, next)
})

router.get(textString, (req, res, next)=> {
  textController.list(req, res, next)
})

router.post(textString, (req, res, next)=> {
  textController.add(req, res, next)
})

router.patch(textString, (req, res, next) => {
  textController.update(req, res, next)
})

router.delete(`${textString}/:id`, (req, res, next)=> {
  textController.del(req, res, next)
})


export default router