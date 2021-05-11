import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'

const cfg: ISqlConfig = {
    add: 'INSERT or IGNORE INTO text(text, langId, rowId) VALUES \
    ($text, $langId, $rowId)',
    get: 'SELECT * from text WHERE id = $id',
    list: 'SELECT * from text WHERE rowId = $rowId',
    update: 'UPDATE text SET text = $text WHERE rowId=$rowId AND langId=$langId',
    del: 'DELETE from text WHERE id = $id',
    tableName: 'text'
}

class TextModel extends BaseSqliteModel {
    constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
        super(sqliteHelper, cfg)
    }


}

export { TextModel, cfg }