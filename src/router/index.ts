import { Router } from 'express'
import project from './project.route'
import lang from './language.route'
import page from './page.route'
import row from './row.route'
import text from './text.route'
import projectLang from './projectLang.route'
import download from './download.route'
import deploy from './deploy.ruote'



const router = Router()
router.use('/', project)
router.use('/', lang)
router.use('/', page)
router.use('/', row)
router.use('/', text)
router.use('/', projectLang)
router.use('/', download)
router.use('/', deploy)

router.get('/test', (req, res, next)=> {
    console.log('get test')
    res.send('one qqq rock v4')
})

export default router

