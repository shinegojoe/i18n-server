import express from 'express'
import rowController from '../controller/row.controller'
import rowTextDataController from '../controller/rowTextData.controller'
const router = express.Router()

const rowString = '/row'
router.get(`${rowString}/:id`, (req, res, next)=> {
    rowController.get(req, res, next)
})

router.get(rowString, (req, res, next)=> {
    rowController.list(req, res, next)
})

router.post(rowString, (req, res, next)=> {
    rowController.add(req, res, next)
})

router.patch(rowString, (req, res, next) => {
    rowController.update(req, res, next)
})

router.delete(`${rowString}/:id`, (req, res, next)=> {
    rowController.del(req, res, next)
})

// row text data
router.get('/rowTextData', (req, res, next)=> {
    rowTextDataController.rowTextData(req, res, next)
})

router.post('/rowTextData', (req, res, next)=> {
    rowTextDataController.addNewRow(req, res, next)
})


export default router