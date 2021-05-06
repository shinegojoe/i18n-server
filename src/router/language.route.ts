import express from 'express'
import languageController from '../controller/language.controller'
const router = express.Router()

/* ........ stock ........*/
const languageString = '/language'
router.get(`${languageString}/:id`, (req, res, next)=> {
  languageController.get(req, res, next)
})

router.get(languageString, (req, res, next)=> {
  languageController.list(req, res, next)
})

router.post(languageString, (req, res, next)=> {
  languageController.add(req, res, next)
})

router.patch(languageString, (req, res, next) => {
  languageController.update(req, res, next)
})

router.delete(`${languageString}/:id`, (req, res, next)=> {
  languageController.del(req, res, next)
})


export default router