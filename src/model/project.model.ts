import { Request } from 'express'
import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'

const cfg: ISqlConfig = {
    add: 'INSERT or IGNORE INTO project(name, coverPhoto) VALUES ($name, $coverPhoto)',
    get: 'SELECT * from project WHERE id = $id',
    list: 'SELECT * from project',
    update: 'UPDATE project SET name = $name WHERE id = $id',
    del: 'DELETE from project WHERE id = $id',
    tableName: 'project'
}

class ProjectModel extends BaseSqliteModel {
    constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
        super(sqliteHelper, cfg)
    }

    async del(req: Request) {

        const db = this.sqliteHelper.connect()
        var begin = db.prepare('BEGIN')
        var commit = db.prepare('COMMIT')
        var rollback = db.prepare('ROLLBACK')
        const projectId = req.params.id

        begin.run()
        try {

            // delete projectLang
            const sql1 = 'DELETE from projectLang WHERE projectId = $id'
            const q1 = {
                id: parseInt(projectId)
            }
            const stmt1 = db.prepare(sql1)
            const res1 = stmt1.run(q1)

            
            // select page list
            const sql2 = 'SELECT id from page WHERE projectId = $id'
            const q2 = {
                id: projectId
            }
            const stmt2 = db.prepare(sql2)
            const pageList = stmt2.all(q2)
            // console.log(res2)
            for(const page of pageList) {
                // select rows
                const sql = 'SELECT id from row WHERE pageId = $pageId'
                const q = {
                    pageId: page.id
                }
                const stmt = db.prepare(sql)
                const rowList = stmt.run(q)
                for(const row of rowList) {
                    // delete text
                    const sql = 'SELECT id from text WHERE rowId = $rowId'
                    const q = {
                        rowId: row.id
                    }
                    const stmt = db.prepare(sql)
                    const res = stmt.run(q)

                    // delete row
                    const sql2 = 'SELECT id from row WHERE id = $rowId'
                    const q2 = {
                        rowId: row.id
                    }
                    const stmt2 = db.prepare(sql2)
                    const res2 = stmt2.run(q2)
                }
                // delete page
                const sql4 = 'DELETE from page WHERE Id = $id'
                const q4 = {
                    id: page.id
                }
                const stmt4 = db.prepare(sql4)
                const res4 = stmt4.run(q4)

            }

            // delete project
            const sql5 = 'DELETE from project WHERE id = $id'
            const q5 = {
                id: projectId
            }
            const stmt5 = db.prepare(sql5)
            const res = stmt5.run(q5)
            
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

export { ProjectModel, cfg }