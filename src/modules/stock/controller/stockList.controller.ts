import { BaseController } from '../../../controller/base.controller'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { StockListModel, cfg } from '../model/stockList.model'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)
const model = new StockListModel(sqliteHelper, cfg)

class StockListController extends BaseController {
  constructor(model: StockListModel) {
    super(model)
  }
}

const controller = new StockListController(model)
export default controller