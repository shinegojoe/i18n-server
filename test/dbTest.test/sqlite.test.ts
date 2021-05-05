// import SqlLiteHelper from '../../src/DBHelper/sqlliteHelper'
import SqlLiteHelper from '../../src/helper/DBHelper/sqlliteHelper'
// import { SqliteQuery, QueryResult, IQueryObj, IQueryResult } from '../../src/DBHelper/IQueryObj'
import { SqliteQuery, QueryResult, IQueryObj, IQueryResult } from '../../src/helper/DBHelper/IQueryObj'

import chai, { expect, assert } from 'chai'


// const SqlLiteHelper = require('../../src/DBHelper/sqlliteHelper.ts')
// const { expect } = require('chai')

const tableInit = (sqlHelper: SqlLiteHelper) => {
  const sql = `CREATE TABLE IF NOT EXISTS testTable (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT,
    remark TEXT
  );`
  const q = new SqliteQuery()
  q.sql = sql
  q.query = {}
  sqlHelper.runSql(q)

}

describe("sqlite test", ()=> {
  const testDB = 'testDB.db'
  let sqlHelper = new SqlLiteHelper(testDB)
  tableInit(sqlHelper)
  
  before(async()=> {
    const sql = `DELETE from testTable`
    const q = new SqliteQuery()
    q.sql = sql
    q.query = {}
    const res: IQueryResult = await sqlHelper.deleteMany(q)
  })
  it("insert one", async()=> {
    // const s = new SqlLiteHelper()
    let sql = "INSERT INTO testTable(name,remark) VALUES ($name,$remark)"
    const data = {
      name: "qq5777",
      remark: "qqq"
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.insertData = data
    const res: IQueryResult = await sqlHelper.insertOne(q)
    console.log("res", res.data)
    expect(res.data.changes).to.be.equal(1)
  })

  it("insert many", async()=> {
    let sql = "INSERT INTO testTable(name,remark) VALUES ($name,$remark)"
    const data1 = { name: "data1", remark: "yy" }
    const data2 = { name: "data2", remark: "xx" }
    const data3 = { name: "data3", remark: "zz" }
    const data4 = { name: "data3", remark: "zz" }

    const q = new SqliteQuery()
    q.sql = sql
    q.insertData = [data1, data2, data3, data4]
    const res: IQueryResult = await sqlHelper.insertMany(q)
    console.log("res", res)
    expect(res.data.insertedCount).to.be.equal(4)
  })

  it("find one", async()=> {
    const sql: string = "SELECT * from testTable WHERE name = $name"
    const q = new SqliteQuery()
    q.sql = sql
    q.query = { name: 'data1'}
    const res: IQueryResult = await sqlHelper.findOne(q)
    // console.log("res", res)
    // expect(res.data.name).to.be.equal('data1')
    assert.equal(res.data.name, q.query.name)

  })
  
  it("find many", async()=> {
    const sql: string = "SELECT * from testTable"
    const q = new SqliteQuery()
    q.sql = sql
    q.query = {}
    const res: IQueryResult = await sqlHelper.findMany(q)
    // console.log("res", res)
    assert.isArray(res.data)


  })
  
  it("update one", async()=> {
    const sql = `UPDATE testTable SET name = $newName, remark = $remark WHERE name = $oldName`
    const param = {
      oldName: "data2",
      newName: "newData2",
      remark: "newRemark"
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    q.tabName = 'testTable'
    const res = await sqlHelper.updateOne(q)
    // console.log('res', res)
    assert.equal(res.data.changes, 1)
  })
  
  it("update many", async()=> {
    const sql = `UPDATE testTable SET name = $newName, remark = $remark WHERE name = $oldName`
    const param = {
      oldName: "data3",
      newName: "newData3",
      remark: "newRemark"
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    const res = await sqlHelper.runSql(q)
    // console.log('res', res)
    assert.equal(res.data.changes, 2)
  })
  
  it("delete one", async()=> {
    const sql = `DELETE from testTable WHERE name = $xxx`

    const param = {
      xxx: "data1" 
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    q.tabName = 'testTable'
    const res: IQueryResult = await sqlHelper.deleteOne(q)
    // console.log("res", res.data)
    assert.equal(res.data.changes, 1)

  })
  
  it("delete many", async()=> {
    const sql = `DELETE from testTable WHERE name = $xxx`
    const param = {
      xxx: "newData3" 
    }
    const q = new SqliteQuery()
    q.sql = sql
    q.query = param
    const res: IQueryResult = await sqlHelper.deleteMany(q)
    // console.log("res", res.data)
    assert.equal(res.data.changes, 2)

  })
})




