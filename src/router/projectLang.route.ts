import express from 'express'
import projectLangController from '../controller/projectLang.controller'
const router = express.Router()

const projectLangString = '/projectLang'
router.get(`${projectLangString}/:id`, (req, res, next)=> {
    projectLangController.get(req, res, next)
})

router.get(projectLangString, (req, res, next)=> {
    projectLangController.list(req, res, next)
})

router.post(projectLangString, (req, res, next)=> {
    projectLangController.add(req, res, next)
})

router.patch(projectLangString, (req, res, next) => {
    projectLangController.update(req, res, next)
})

router.delete(`${projectLangString}/:id`, (req, res, next)=> {
    projectLangController.del(req, res, next)
})


export default router