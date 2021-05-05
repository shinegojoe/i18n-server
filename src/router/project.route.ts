import express from 'express'
import projectController from '../controller/project.controller'
const router = express.Router()

/* ........ stock ........*/
const stockString = '/project'
router.get(`${stockString}/:id`, (req, res, next)=> {
    projectController.get(req, res, next)
})

router.get(stockString, (req, res, next)=> {
    projectController.list(req, res, next)
})

router.post(stockString, (req, res, next)=> {
    projectController.add(req, res, next)
})

router.patch(stockString, (req, res, next) => {
    projectController.update(req, res, next)
})

router.delete(`${stockString}/:id`, (req, res, next)=> {
    projectController.del(req, res, next)
})


export default router