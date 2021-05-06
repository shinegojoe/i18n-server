import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'


const cfg: ISqlConfig = {
  add: 'INSERT or IGNORE INTO language(name) VALUES ($name)',
  get: 'SELECT * from language WHERE id = $id',
  list: 'SELECT * from language',
  update: 'UPDATE language SET name = $name WHERE id = $id',
  del: 'DELETE from language WHERE id = $id',
  tableName: 'language'
}

class LanguageModel extends BaseSqliteModel {
  constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
    super(sqliteHelper, cfg)
  }
}

export { LanguageModel, cfg }
