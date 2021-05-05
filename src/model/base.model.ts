import { Request } from 'express'
import { SqliteQuery } from '../helper/DBHelper/IQueryObj'
import SqlLiteHelper from 'helper/DBHelper/sqlliteHelper'

interface IBaseModel {
  add(req: Request): any
  get(req: Request): any
  list(req: Request): any
  update(req: Request): any
  del(req: Request): any
}

interface ISqlConfig{
  add: string
  get: string
  list: string
  del: string
  update: string
  tableName: string
}


class BaseSqliteModel implements IBaseModel {
  sqliteHelper: SqlLiteHelper
  sqlConfig: ISqlConfig
  
  constructor(sqliteHelper: SqlLiteHelper, sqlConfig: ISqlConfig) {
    this.sqliteHelper = sqliteHelper
    this.sqlConfig = sqlConfig
  }
  async add(req: Request) {
    const q = new SqliteQuery()
    // q.sql = 'INSERT or IGNORE INTO role(name) VALUES ($name)'
    q.sql = this.sqlConfig.add
    q.insertData = req.body
    const data = await this.sqliteHelper.insertOne(q)
    console.log('add data', data)
    return data
  }

  async get(req: Request) {
    const q = new SqliteQuery()
    q.sql = this.sqlConfig.get
    q.query = req.params
    const data = await this.sqliteHelper.findOne(q)
    return data
  }

  async update(req: Request){
    const q = new SqliteQuery()
    q.sql = this.sqlConfig.update
    q.query = req.body
    q.tabName = this.sqlConfig.tableName
    const data = await this.sqliteHelper.updateOne(q)
    return data
  }
  
  async list(req: Request){
    const q = new SqliteQuery()
    q.sql = this.sqlConfig.list
    q.query = req.query
    const data = await this.sqliteHelper.findMany(q)
    return data
  }
  
  async del(req: Request){
    const q = new SqliteQuery()
    q.sql = this.sqlConfig.del
    q.query = req.params
    q.tabName = this.sqlConfig.tableName
    const data = await this.sqliteHelper.deleteOne(q)
    return data
  }
}

export { IBaseModel, BaseSqliteModel, ISqlConfig }