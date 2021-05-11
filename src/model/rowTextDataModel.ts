import SqliteHelper from '../helper/DBHelper/sqlliteHelper'
import { Request } from 'express'


class RowTextDataModel {
  sqliteHelper: SqliteHelper
  constructor(sqliteHelper: SqliteHelper) {
    this.sqliteHelper = sqliteHelper
  }

  async addNewRow(req: Request) {
    const body = req.body
    // pageId
    // langList
    // name
    console.log('body', body)
    const db = this.sqliteHelper.connect()
    var begin = db.prepare('BEGIN')
    var commit = db.prepare('COMMIT')
    var rollback = db.prepare('ROLLBACK')

    begin.run()
    try {
      const sql1 = 'INSERT INTO row(name, pageId, sortId) VALUES ($name, $pageId, $sortId)'
      const q1 = {
        pageId: body.pageId,
        name: body.name,
        sortId: 0
      }
      const stmt = db.prepare(sql1)
      const res1 = stmt.run(q1)
      for (const lang of body.langList) {
        const sql2 = 'INSERT INTO text(text, rowId, langId) VALUES ($text, $rowId, $langId)'
        const q2 = {
          rowId: res1.lastInsertRowid,
          langId: lang.id,
          text: ''
        }
        const stmt2 = db.prepare(sql2)
        const res2 = stmt2.run(q2)
      }

      commit.run()
      return {}
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

  async rowTextData(req: Request) {
    const db = this.sqliteHelper.connect()
    const sql = 'SELECT * from row WHERE pageId=$pageId'
    const q = {
      pageId: req.query.pageId
    }
    const stmt = db.prepare(sql)
    const rowList = stmt.all(q)
    const res = []
    for (const row of rowList) {
      const sql = 'SELECT text.id, language.name, text.text from text INNER JOIN language ON text.langId=language.id\
         WHERE rowId=$rowId'
      const q = { rowId: row.id }
      const stmt = db.prepare(sql)
      let textList = stmt.all(q)
      const dataMap: any = {}
      const text: any = {}
      textList = textList.map((item: any, index: number) => {
        item.lang = item.name
        // delete item.name
        text[item.name] = item.text

        return item
      })
      dataMap.name = row.name
      dataMap.id = row.id
      dataMap.text = text

      // res.push({
      //     name: row.name,
      //     textList: textList
      // })
      res.push(dataMap)
    }
    db.close()
    return res
  }

  async delRow(req: Request) {
    const rowId = req.params.id
    const db = this.sqliteHelper.connect()
    var begin = db.prepare('BEGIN')
    var commit = db.prepare('COMMIT')
    var rollback = db.prepare('ROLLBACK')
    begin.run()
    try {
      const sql1 = 'DELETE from text WHERE rowId=$rowId'
      const q1 = {rowId}
      const stmt1 = db.prepare(sql1)
      const res1 = stmt1.run(q1)

      const sql2 = 'DELETE from row WHERE id=$rowId'
      const q2 = {rowId}
      const stmt2 = db.prepare(sql2)
      const res2 = stmt2.run(q2)
      commit.run()
      return res2

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

export { RowTextDataModel }