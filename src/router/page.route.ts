import express from 'express'
import pageController from '../controller/page.controller'
const router = express.Router()

const projectString = '/page'
router.get(`${projectString}/:id`, (req, res, next)=> {
  pageController.get(req, res, next)
})

router.get(projectString, (req, res, next)=> {
  pageController.list(req, res, next)
})

router.post(projectString, (req, res, next)=> {
  pageController.add(req, res, next)
})

router.patch(projectString, (req, res, next) => {
  pageController.update(req, res, next)
})

router.delete(`${projectString}/:id`, (req, res, next)=> {
  pageController.del(req, res, next)
})


export default router