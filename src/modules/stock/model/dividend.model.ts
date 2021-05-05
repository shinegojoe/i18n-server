import { Request } from 'express'
import { IDividendReq } from '../../../IAPI/IStock'
import { BaseSqliteModel, ISqlConfig } from '../../../model/base.model'
import SqliteHelper from '../../../helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../../helper/DBHelper/IQueryObj'



const cfg: ISqlConfig = {
  add: 'INSERT or IGNORE INTO dividend(stockId, year, EPS, cash, stock) VALUES \
  ($stockId, $year, $EPS, $cash, $stock)',
  get: 'SELECT * from dividend WHERE id = $id',
  list: 'SELECT * from dividend',
  update: 'UPDATE dividend SET name = $name WHERE id = $id',
  del: 'DELETE from dividend WHERE id = $id',
  tableName: 'dividend'
}

class DividendModel extends BaseSqliteModel {
  constructor(sqlHelper: SqliteHelper, cfg: ISqlConfig) {
    super(sqlHelper, cfg)
  }

  async add(req: Request) {
    const body = req.body as IDividendReq
    console.log(body)
    // const db = new sqlite3(dbPath, { verbose: console.log })
    const db = this.sqliteHelper.connect()
    const begin = db.prepare('BEGIN')
    const commit  = db.prepare('COMMIT')
    const rollback = db.prepare('ROLLBACK')
    begin.run()
    try {
      
      const sql1 = 'SELECT * from stock WHERE code = $code'
      const q1 = {
        code: body.code
      }
      const stmt1 = db.prepare(sql1)
      const res1 = stmt1.get(q1)
      console.log('res1', res1)
      const sql2 = 'INSERT or IGNORE INTO dividend(stockId, year, EPS, cash, stock) VALUES ($stockId, $year, $EPS, $cash, $stock)'
      const q2 = {
        stockId: res1.id,
        year: body.year,
        EPS: body.EPS,
        cash: body.cash,
        stock: body.stock
      }
      const stmt2 = db.prepare(sql2)
      const res2 = stmt2.run(q2)
      console.log('res2', res2)
      commit.run()
      return res2

    } catch(e) {
      console.log(e)
    } finally {
      if(db.inTransaction) {
        rollback.run()
      }
      db.close()
    }

   
    return body
  }
}


export { DividendModel, cfg }