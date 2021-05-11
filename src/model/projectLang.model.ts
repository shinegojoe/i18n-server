import { Request } from 'express'
import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../helper/DBHelper/IQueryObj'


const cfg: ISqlConfig = {
    add: 'INSERT or IGNORE INTO projectLang(projectId, langId) VALUES ($projectId, $langId)',
    get: 'SELECT * from projectLang WHERE id = $id',
    list: 'SELECT * from projectLang WHERE projectId = $projectId',
    update: 'UPDATE projectLang SET projectId = $projectId, langId = $langId WHERE id = $id',
    del: 'DELETE from projectLang WHERE id = $id',
    tableName: 'projectLang'
}

class ProjectLangModel extends BaseSqliteModel {
    constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
        super(sqliteHelper, cfg)
    }

    async add(req: Request) {
        // if lang exist, don't add
        const db = this.sqliteHelper.connect()
        const body = req.body
        console.log('body', body)
        const sql1 = 'SELECT * from projectLang WHERE projectId=$projectId AND langId=$langId'
        const stmt1 = db.prepare(sql1)
        const projectLangList = stmt1.all(body)
        console.log('projectLangList', projectLangList)
        if(projectLangList.length > 0 ) {
            db.close()
            return {}
        }
        const sql2 = 'INSERT INTO projectLang(projectId, langId) VALUES ($projectId, $langId)'
        const stmt2 = db.prepare(sql2)
        const res = stmt2.run(body)
        db.close()
        return res

        
    }

    async list(req: Request) {
        const projectId = req.query.projectId
        const db = this.sqliteHelper.connect()
        const sql = 'SELECT language.name, language.id FROM projectLang INNER JOIN language ON \
        projectLang.langId=language.id WHERE projectId=$projectId'
        const stmt = db.prepare(sql)
        const q = {projectId}
        const res = stmt.all(q)
        console.log('res', res)
        db.close()
        return res
        // var begin = db.prepare('BEGIN')
        // var commit = db.prepare('COMMIT')
        // var rollback = db.prepare('ROLLBACK')
        // console.log('projectId', projectId)

        // begin.run()
        // try {
        //     const sql1 = 'SELECT * from projectLang WHERE projectId = $projectId'
        //     const q1 = {
        //         projectId
        //     }
        //     const stmt = db.prepare(sql1)
        //     const projectLangList = stmt.all(q1)
        //     console.log('projectLangList', projectLangList)
            
        //     const sql2 = 'SELECT * from language'
           
        //     const stmt2 = db.prepare(sql2)
        //     const langList = stmt2.all()
        //     commit.run()
        //     return projectLangList
        // } catch(e) {
        //     throw e
        // }
        // finally {
        //     if(db.inTransaction) {
        //         rollback.run()
        //     }
        //     db.close()
        // }
    }
}

export { ProjectLangModel, cfg }