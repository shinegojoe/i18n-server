import { Router } from 'express'
// import stockInfoRouter from './stockInfo.route'
// import stockListRouter from './stockList.route'
// import rbacRouter from './rbac.route'
// import accoutRouter from './account.route'
// import shopRouter from './shop.route'
// import fileUploadRouter from './fileUpload.route'
// import login from './login.route'
import stock from './stock.route'

const router = Router()

// router.use('/stockInfo', stockInfoRouter)
// router.use('/stockList', stockListRouter)
// router.use('/', rbacRouter)
// router.use('/', accoutRouter)
// router.use('/', shopRouter)
// router.use('/', fileUploadRouter)
// router.use('/', login)
router.use('/', stock)


export default router

