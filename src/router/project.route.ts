import express from 'express'
import projectController from '../controller/project.controller'
const router = express.Router()

const projectString = '/project'
router.get(`${projectString}/:id`, (req, res, next)=> {
    projectController.get(req, res, next)
})

router.get(projectString, (req, res, next)=> {
    projectController.list(req, res, next)
})

router.post(projectString, (req, res, next)=> {
    projectController.add(req, res, next)
})

router.patch(projectString, (req, res, next) => {
    projectController.update(req, res, next)
})

router.delete(`${projectString}/:id`, (req, res, next)=> {
    projectController.del(req, res, next)
})


export default router