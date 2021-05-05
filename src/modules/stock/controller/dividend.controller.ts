import { BaseController } from '../../../controller/base.controller'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { DividendModel, cfg } from '../model/dividend.model'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)
const model = new DividendModel(sqliteHelper, cfg)

class DividendController extends BaseController {
  constructor(model: DividendModel) {
    super(model)
  }
}

const controller = new DividendController(model)
export default controller