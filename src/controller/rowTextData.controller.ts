import { Request, Response, NextFunction } from 'express'
// import { RowModel, cfg } from '../model/row.model'
import { RowTextDataModel} from '../model/rowTextDataModel'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import httpStatus from 'http-status'
import { List } from '../responseLayer/sqlite.layer'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)
// const model = new RowModel(sqliteHelper, cfg)
const model = new RowTextDataModel(sqliteHelper)

class RowTextDataController {
  model: RowTextDataModel
  respLayer: List
  constructor(model: RowTextDataModel) {
    this.model = model
    this.respLayer = new List()
  }

  async rowTextData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.rowTextData(req)
      const resp = this.respLayer.resp(data)
      res.status(httpStatus.OK).json(resp)
    } catch(e) {
      next(e)
    }
  }

  async addNewRow(req:Request, res: Response, next: NextFunction) {
    try {
      const data = await this.model.addNewRow(req)
      const resp = this.respLayer.resp(data)
      res.status(httpStatus.OK).json(resp)

    } catch(e) {
      next(e)
    }
  }
}

const controller = new RowTextDataController(model)

export default controller