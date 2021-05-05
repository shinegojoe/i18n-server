import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'

const cfg: ISqlConfig = {
  add: 'INSERT or IGNORE INTO stock(name, code, category) VALUES ($name, $code, $category)',
  get: 'SELECT * from stock WHERE id = $id',
  list: 'SELECT * from stock',
  update: 'UPDATE stock SET name = $name WHERE id = $id',
  del: 'DELETE from stock WHERE id = $id',
  tableName: 'stock'
}

class StockListModel extends BaseSqliteModel {
  constructor(sqlHelper: SqliteHelper, cfg: ISqlConfig) {
    super(sqlHelper, cfg)
  }
}


export { StockListModel, cfg }

