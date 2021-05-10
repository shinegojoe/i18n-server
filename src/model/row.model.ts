import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { Request } from 'express'

const cfg: ISqlConfig = {
    add: 'INSERT or IGNORE INTO row(name, pageId, sortId) VALUES \
    ($name, $pageId, $sortId)',
    get: 'SELECT * from row WHERE id = $id',
    list: 'SELECT * from row WHERE pageId = $pageId',
    update: 'UPDATE row SET name = $name WHERE id = $id',
    del: 'DELETE from row WHERE id = $id',
    tableName: 'row'
}

class RowModel extends BaseSqliteModel {
    constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
        super(sqliteHelper, cfg)
    }

    async del(req: Request) {
        const db = this.sqliteHelper.connect()
        var begin = db.prepare('BEGIN')
        var commit = db.prepare('COMMIT')
        var rollback = db.prepare('ROLLBACK')
        const rowId = req.params.id

        begin.run()
        try {
            const sql1 = 'DELETE from text WHERE rowId = $rowId'
            const q1 = {
                rowId: rowId
            }
            const stmt = db.prepare(sql1)
            const res = stmt.run(q1)
            
            const sql2 = 'DELETE from row WHERE id = $rowId'
            const q2 = {
                rowId: rowId
            }
            const stmt2 = db.prepare(sql2)
            const res2 = stmt2.run(q2)
            commit.run()
            return res2
        } catch(e) {
            throw e
        }
        finally {
            if(db.inTransaction) {
                rollback.run()
            }
            db.close()
        }
    }
}

export { RowModel, cfg }