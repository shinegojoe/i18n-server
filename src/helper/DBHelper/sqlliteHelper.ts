import IDBHelper from './IDBHelper'
import { IQueryObj, IQueryResult, QueryResult } from './IQueryObj'
// var sqlite3 = require('sqlite3').verbose();
const sqlite3 = require('better-sqlite3');

interface ISqliteResp {
  changes: number
  lastInsertRowid: number
}

class SqlLiteHelper implements IDBHelper {
  dbPath: string
  constructor(dbPath: string) {
    this.dbPath = dbPath
    console.log("this is sqllite helper")
  }

  connect():any {
    const db = new sqlite3(this.dbPath, { verbose: console.log })
    return db
  }

  async insertOne(query: IQueryObj): Promise<any> {
    let db
    try {
      db = this.connect()
      const stmt = db.prepare(query.sql)
      const res = stmt.run(query.insertData) as ISqliteResp
      // const queryRes = new QueryResult(res)
      // return queryRes
      return res
    } catch (e) {
      throw e
    } finally {
      db.close()
    }
  }

  async insertMany(query: IQueryObj): Promise<IQueryResult> {
    let db
    try {
      db = this.connect()
      const insert = db.prepare(query.sql)
      const run = db.transaction((data: any) => {
        let i = 0
        for (const d of data) {
          insert.run(d)
          i += 1
        }
        return {
          insertedCount: i
        }
      })
      const res = run(query.insertData)
      // const queryRes = new QueryResult(res)
      // return queryRes
      return res
    } catch (e) {
      throw e
    } finally {
      db.close()
    }
  }

  async findOne(query: IQueryObj): Promise<any> {
    let db
    try {
      db = this.connect()
      const stmt = db.prepare(query.sql);
      const res = stmt.get(query.query)
      // const queryRes = new QueryResult(res)
      // return queryRes
      return res

    } catch (e) {
      throw e

    } finally {
      db.close()
    }
  }

  async findMany(query: IQueryObj): Promise<any> {
    let db
    try {
      db = this.connect()
      const stmt = db.prepare(query.sql)
      const res = stmt.all(query.query)
      // const queryRes = new QueryResult(res)
      // return queryRes
      return res

    } catch (e) {
      throw e
    } finally {
      db.close()
    }
  }

  async deleteOne(query: IQueryObj): Promise<any> {
      let db
      try {
        db = this.connect()
        const sql = query.sql.replace("DELETE", "SELECT *")
        const delSql = `DELETE from ${query.tabName} WHERE id = $id`
        const stmt = db.prepare(sql)
        const res = stmt.get(query.query)
        if (res === undefined) {
          return new QueryResult({})
        } else {
          const stmtDel = db.prepare(delSql)
          const resDel = stmtDel.run({id: res.id}) as ISqliteResp
          // const queryRes = new QueryResult(resDel)
          // return queryRes
          return resDel
        }
  
      } catch(e) {
        throw e
  
      } finally {
        db.close()
      }
  }

  async deleteMany(query: IQueryObj): Promise<any> {

    return this.runSql(query)
  }

  async updateOne(query: IQueryObj): Promise<any> {
      let db
      try {
        db = this.connect()
        var re = new RegExp('WHERE')
        const res = query.sql.search(re)
        let x = ''
        for(let i = res; i<query.sql.length; i++) {
          x += query.sql[i]
        }
        let y = ''
        for(let i = 0; i<res; i++) {
          y += query.sql[i]
        }
        const selectSql = `SELECT * from ${query.tabName} ${x}`
        const stmt = db.prepare(selectSql)
        const selectRes = stmt.get(query.query)
        if(selectRes === undefined) {
          // return new QueryResult({})
          return {}
        } else {
          const updateSql = `${y} WHERE id = ${selectRes.id}`
          const updateStmt = db.prepare(updateSql)
          const updateRes = updateStmt.run(query.query) as ISqliteResp
          // return new QueryResult(updateRes)
          return updateRes
      }
  
      } catch(e) {
        throw e
      } finally {
        db.close()
      }    
    
  }

  async updateMany(query: IQueryObj): Promise<any> {
    return this.runSql(query)
  }

  async runSql(query: IQueryObj): Promise<any> {
    let db
    try {
      db = this.connect()
      const stmt = db.prepare(query.sql)
      const res = stmt.run(query.query)
      // return new QueryResult(res)
      return res
    } catch(e) {
      throw e
    } finally {
      db.close()
    }
  }
}

export default SqlLiteHelper