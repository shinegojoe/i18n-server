import { TextModel, cfg } from '../model/text.model'
import { BaseController } from './base.controller'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

class TextController extends BaseController {
  constructor(model: TextModel) {
    super(model)
  }
}

const model = new TextModel(sqliteHelper, cfg)
const controller = new TextController(model)

export default controller
