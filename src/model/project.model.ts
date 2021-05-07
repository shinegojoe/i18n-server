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
}

export { ProjectModel, cfg }