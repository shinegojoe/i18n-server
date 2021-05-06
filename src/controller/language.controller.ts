import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { BaseController } from './base.controller'
import { LanguageModel, cfg } from '../model/language.model'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

class LanguageController extends BaseController {
  constructor(model: LanguageModel) {
    super(model)
  }
}

const model = new LanguageModel(sqliteHelper, cfg)
const controller = new LanguageController(model)

export default controller
