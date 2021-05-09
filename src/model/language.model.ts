import { Request } from 'express'
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

    async del(req: Request) {
        // delete from row
        // delete from projectLang
        const db = this.sqliteHelper.connect()
        var begin = db.prepare('BEGIN')
        var commit = db.prepare('COMMIT')
        var rollback = db.prepare('ROLLBACK')
        const langId = req.params.id

        begin.run()
        try {
            const sql1 = 'DELETE from row WHERE langId = $id'
            const q1 = {
                id: parseInt(langId)
            }
            const stmt1 = db.prepare(sql1)
            const res1 = stmt1.run(q1)
           

            const sql2 = 'DELETE from projectLang WHERE langId = $id'
            const q2 = {
                id: langId
            }
            const stmt2 = db.prepare(sql2)
            const res2 = stmt2.run(q2)

            const sql3 = 'DELETE from language WHERE id = $id'
            const q3 = {
                id: langId
            }
            const stmt3 = db.prepare(sql3)
            const res = stmt3.run(q3)

            
            commit.run()
            return res
        } catch (e) {
            throw e
        }
        finally {
            if (db.inTransaction) {
                rollback.run()
            }
            db.close()
        }
    }
}

export { LanguageModel, cfg }
