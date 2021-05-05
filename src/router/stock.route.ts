import express from 'express'
import stockController from '../modules/stock/controller/stockList.controller'
import dividendController from '../modules/stock/controller/dividend.controller'

const router = express.Router()

/* ........ stock ........*/
const stockString = '/stock'
router.get(`${stockString}/:id`, (req, res, next)=> {

})

router.get(stockString, (req, res, next)=> {
  stockController.list(req, res, next)
})

router.post(stockString, (req, res, next)=> {
  stockController.add(req, res, next)
})

router.patch(stockString, (req, res, next) => {
  stockController.update(req, res, next)
})

router.delete(`${stockString}/:id`, (req, res, next)=> {
  stockController.del(req, res, next)
})


/* ........ dividend ........*/
const dividendString = '/dividend'

router.get(`${dividendString}/:id`, (req, res, next)=> {
  dividendController.get(req, res, next)
})
router.get(`${dividendString}`, (req, res, next)=> {
  dividendController.list(req, res, next)
})
router.post(`${dividendString}`, (req, res, next)=> {
  dividendController.add(req, res, next)
})
router.patch(`${dividendString}`, (req, res, next)=> {
  dividendController.update(req, res, next)
})
router.delete(`${dividendString}/:id`, (req, res, next)=> {
  dividendController.del(req, res, next)
})






export default router