import { RowModel, cfg } from '../model/row.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { BaseController } from './base.controller'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

class RowController extends BaseController {
  constructor(model: RowModel) {
    super(model)
  }
}

const model = new RowModel(sqliteHelper, cfg)
const controller = new RowController(model)

export default controller 