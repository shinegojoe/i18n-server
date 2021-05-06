import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'

const cfg: ISqlConfig = {
  add: 'INSERT or IGNORE INTO page(name, projectId) VALUES ($name, $projectId)',
  get: 'SELECT * from page WHERE id = $id',
  list: 'SELECT * from page',
  update: 'UPDATE page SET name = $name WHERE id = $id',
  del: 'DELETE from page WHERE id = $id',
  tableName: 'page'
}

class PageModel extends BaseSqliteModel {
  constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
    super(sqliteHelper, cfg)
  }
}

export { PageModel, cfg }