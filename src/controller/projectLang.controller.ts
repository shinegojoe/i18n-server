import { ProjectLangModel, cfg } from '../model/projectLang.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { BaseController } from './base.controller'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

class RowController extends BaseController {
  constructor(model: ProjectLangModel) {
    super(model)
  }
}

const model = new ProjectLangModel(sqliteHelper, cfg)
const controller = new RowController(model)

export default controller 