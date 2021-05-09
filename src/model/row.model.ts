import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'

const cfg: ISqlConfig = {
    add: 'INSERT or IGNORE INTO row(text, langId, pageId, sortId) VALUES \
    ($text, $langId, $pageId, $sortId)',
    get: 'SELECT * from row WHERE id = $id',
    list: 'SELECT * from row WHERE pageId = $pageId',
    update: 'UPDATE row SET text = $text WHERE id = $id',
    del: 'DELETE from row WHERE id = $id',
    tableName: 'row'
}

class RowModel extends BaseSqliteModel {
    constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
        super(sqliteHelper, cfg)
    }
}

export { RowModel, cfg }