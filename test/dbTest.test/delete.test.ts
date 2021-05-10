import addTestData from '../addTestData.test'
import SqliteHelper, { ISqliteResp } from '../../src/helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../src/helper/DBHelper/IQueryObj'
import { assert } from 'chai'
import { runInNewContext } from 'vm'

const sqliteHelper = new SqliteHelper('testDB.db')

class DeleteTester {

  async deleteItem(tableName: string, id: number) {
    const q = new SqliteQuery()
    q.sql = `DELETE from ${tableName} WHERE id = $id`
    q.query = {
      id
    }
    q.tabName = tableName
    const res = await sqliteHelper.deleteMany(q) as ISqliteResp
    return res
  }

  runStmt(db: any, sql: string, q: any) {
    const stmt = db.prepare(sql)
    const res = stmt.run(q)
    return res
  }

  async deleteText() {
    const testData: any = await addTestData()
    const res = await this.deleteItem('text', testData.textId)
    return res
  }

  async deleteRow() {
    const testData: any = await addTestData()
    const db = sqliteHelper.connect()
    var begin = db.prepare('BEGIN')
    var commit = db.prepare('COMMIT')
    var rollback = db.prepare('ROLLBACK')

    begin.run()
    try {
      const sql1 = 'DELETE from text WHERE rowId = $rowId'
      const q1 = {
        rowId: testData.rowId
      }
      const res1 = this.runStmt(db, sql1, q1)

      const sql2 = 'DELETE from row WHERE id = $rowId'
      const q2 = {
        rowId: testData.rowId
      }
      const res = this.runStmt(db, sql2, q2)
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



  async deletePage() {
    const testData: any = await addTestData()
    const db = sqliteHelper.connect()
    var begin = db.prepare('BEGIN')
    var commit = db.prepare('COMMIT')
    var rollback = db.prepare('ROLLBACK')
    begin.run()
    try {
      const sql1 = 'SELECT id from row WHERE pageId = $pageId'
      const q1 = {
        pageId: testData.pageId
      }
      const stmt1 = db.prepare(sql1)
      const rowList = stmt1.all(q1)
      console.log('rowList', rowList)
      for (const row of rowList) {
        const sql = `SELECT id from text WHERE rowId = $rowId`
        const q = {
          rowId: row.id
        }
        const stmt = db.prepare(sql)
        const textList = stmt.all(q)
        console.log('textList', textList)
        for(const text of textList) {
          // delete textList
          const sql = 'DELETE from text WHERE id = $textId'
          const q = {
            textId: text.id
          }
          const stmt = db.prepare(sql)
          stmt.run(q)
        }
        // delete row
        const sql2 = 'DELETE from row WHERE id = $rowId'
        const q2 = {
          rowId: row.id 
        }
        const stmt2 = db.prepare(sql2)
        const res2 = stmt2.run(q2)
      }
      const sql2 = 'DELETE from page WHERE id = $pageId'
      const q2 = {
        pageId: testData.pageId
      }
      const stmt2 = db.prepare(sql2)
      const res2 = stmt2.run(q2)
      commit.run()
      return res2 as ISqliteResp

    } catch (e) {
      throw e
    } finally {
      if (db.inTransaction) {
        rollback.run()
      }
      db.close()
    }
  }


  async deleteProjectLang() {
    const testData: any = await addTestData()
    const res = await this.deleteItem('projectLang', testData.projectLangId)
    return res
  }

  async deleteLang() {
    const testData: any = await addTestData()
    // delete text
    // delete projectLang
    // delete language
    const db = sqliteHelper.connect()
    var begin = db.prepare('BEGIN')
    var commit = db.prepare('COMMIT')
    var rollback = db.prepare('ROLLBACK')
    begin.run()
    try {
      const sql = 'DELETE from text WHERE langId = $langId'
      const q = {
        langId: testData.langId
      }
      this.runStmt(db, sql, q)

      const sql2 = 'DELETE from projectLang WHERE langId = $langId'
      const q2 = {
        langId: testData.langId
      }
      this.runStmt(db, sql2, q2)

      const sql3 = 'DELETE from language WHERE id = $langId'
      const q3 = {
        langId: testData.langId
      }
      const res = this.runStmt(db, sql3, q3)
      commit.run()
      return res as ISqliteResp

    } catch (e) {
      throw e
    } finally {
      if (db.inTransaction) {
        rollback.run()
      }
      db.close()
    }
  }

  async deleteProject() {
    const testData: any = await addTestData()
    // find pages
    // find rows
    // delete text for each
    // delete row for each
    const db = sqliteHelper.connect()
    var begin = db.prepare('BEGIN')
    var commit = db.prepare('COMMIT')
    var rollback = db.prepare('ROLLBACK')
    begin.run()
    try {
      const sql1 = 'SELECT id from page WHERE id = $projectId'
      const q1 = {
        projectId: testData.projectId
      }
      const stmt1 = db.prepare(sql1)
      const pageList = stmt1.all(q1)
      for(const page of pageList) {
        const sql = 'SELECT id from row WHERE pageId = $pageId'
        const q = {
          pageId: page.id
        }
        const stmt = db.prepare(sql)
        const rowList = stmt.all(q)
        console.log('rowList', rowList)
        // delete texts
        for(const row of rowList) {
          const sql = 'DELETE from text WHERE rowId = $rowId'
          const q = {
            rowId: row.id
          }
          const stmt = db.prepare(sql)
          const res = stmt.run(q)
          // delete row
          const sql2 = 'DELETE from row WHERE id = $rowId'
          const q2 = {
            rowId: row.id
          }
          this.runStmt(db, sql2, q2)
        }
        // delete page
        const sql2 = 'DELETE from page WHERE id = $pageId'
        const q2 = {
          pageId: page.id
        }
        this.runStmt(db, sql2, q2)
      }
      // delete projectLang
      const sql2 = 'DELETE from projectLang WHERE projectId = $projectId'
      const q2 = {
        projectId: testData.projectId
      }
      this.runStmt(db, sql2, q2)

      // delete project
      const sql3 = 'DELETE from project WHERE id = $projectId'
      const q3 = {
        projectId: testData.projectId
      }
      const res = this.runStmt(db, sql3, q3)
      commit.run()
      return res as ISqliteResp

    } catch (e) {
      throw e
    } finally {
      if (db.inTransaction) {
        rollback.run()
      }
      db.close()
    }
  }

  run() {

    it('delete text', async () => {
      const res = await this.deleteText()
      // console.log('res', res)
      assert.equal(res.changes, 1)
    })

    it('delete row', async () => {
      const res = await this.deleteRow()
      // console.log('res', res)
      assert.equal(res.changes, 1)
    })

    it('delete page', async () => {
      const res = await this.deletePage()
      // console.log('res', res)
      assert.equal(res.changes, 1)
    })

    it('delete projectLang', async () => {
        const res = await this.deleteProjectLang()
        // console.log('res', res)
        assert.equal(res.changes, 1)
    })

    it('delete lang', async () => {
        const res = await this.deleteLang()
        // console.log('res', res)
        assert.equal(res.changes, 1)
    })

    it('delete project', async () => {
        const res = await this.deleteProject()
        // console.log('res', res)
        assert.equal(res.changes, 1)
    })


  }
}

export { DeleteTester }