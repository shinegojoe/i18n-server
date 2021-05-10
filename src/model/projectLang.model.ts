import { BaseSqliteModel, ISqlConfig } from './base.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'


const cfg: ISqlConfig = {
    add: 'INSERT or IGNORE INTO projectLang(projectId, langId) VALUES ($projectId, $langId)',
    get: 'SELECT * from projectLang WHERE id = $id',
    list: 'SELECT * from projectLang',
    update: 'UPDATE projectLang SET projectId = $projectId, langId = $langId WHERE id = $id',
    del: 'DELETE from projectLang WHERE id = $id',
    tableName: 'projectLang'
}

class ProjectLangModel extends BaseSqliteModel {
    constructor(sqliteHelper: SqliteHelper, cfg: ISqlConfig) {
        super(sqliteHelper, cfg)
    }

    async add() {
        // if lang exist, don't add
    }
}

export { ProjectLangModel, cfg }