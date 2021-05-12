import { ProjectModel, cfg } from '../model/project.model'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { BaseController } from './base.controller'

const dbPath: any = process.env['SQLITE_PATH']
const sqliteHelper = new SqliteHelper(dbPath)

console.log('dbPath', dbPath)
console.log('sqliteHelper', sqliteHelper)


const model = new ProjectModel(sqliteHelper, cfg)

class ProjectController extends BaseController {
    constructor(model: ProjectModel) {
        super(model)
    }
}

const controller  = new ProjectController(model)


export default controller