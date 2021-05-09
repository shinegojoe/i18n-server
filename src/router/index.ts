import { Router } from 'express'
import project from './project.route'
import lang from './language.route'
import page from './page.route'
import row from './row.route'
import projectLang from './projectLang.route'
import deploy from './deploy.ruote'


const router = Router()
router.use('/', project)
router.use('/', lang)
router.use('/', page)
router.use('/', row)
router.use('/', projectLang)
router.use('/', deploy)

router.get('/test', (req, res, next)=> {
    console.log('get test')
    res.send('one qq rock')
})

export default router

