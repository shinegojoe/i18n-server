import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { Request } from 'express-serve-static-core'


const cfg: ISqlConfig = {
    add: 'INSERT or IGNORE INTO page(name, projectId) VALUES ($name, $projectId)',
    get: 'SELECT * from page WHERE id = $id',
    list: 'SELECT * from page WHERE projectId = $projectId',
    update: 'UPDATE page SET name = $name WHERE id = $id',
    del: 'DELETE from page WHERE id = $id',
    tableName: 'page'
}

class PageModel extends BaseSqliteModel {
    constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
        super(sqliteHelper, cfg)
    }

    async del(req: Request) {
        const db = this.sqliteHelper.connect()
        var begin = db.prepare('BEGIN')
        var commit = db.prepare('COMMIT')
        var rollback = db.prepare('ROLLBACK')
        const pageId = req.params.id

        begin.run()
        try {
            const sql1 = 'DELETE from row WHERE pageId = $id'
            const q1 = {
                id: parseInt(pageId)
            }
            const stmt1 = db.prepare(sql1)
            const res1 =  stmt1.run(q1)
            console.log('res1', res1)
            const sql2 = 'DELETE from page WHERE id = $id'
            const q2 = {
                id: pageId
            }
            const stmt2 = db.prepare(sql2)
            const res =  stmt2.run(q2)
            commit.run()
            return res
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

export { PageModel, cfg }