import { PageModel, cfg } from '../model/page.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { BaseController } from './base.controller'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

class PageController extends BaseController {
  constructor(model: PageModel) {
    super(model)
  }
}

const model = new PageModel(sqliteHelper, cfg)
const controller = new PageController(model)

export default controller