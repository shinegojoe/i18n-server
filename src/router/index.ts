import { Router } from 'express'
import project from './project.route'
import lang from './language.route'
import page from './page.route'


const router = Router()

router.use('/', project)
router.use('/', lang)
router.use('/', page)


export default router

