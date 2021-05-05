import chai, { expect, assert } from 'chai'
import MongoHelper from '../../src/helper/DBHelper/mongoHelper'
import { QueryResult, IQueryObj, MongoQuery } from '../../src/helper/DBHelper/IQueryObj'
// require('dotenv').config()


describe('mongo test', ()=> {
  // const uri: string = "mongodb://167.179.80.227:5569"
  const uri: any = process.env["MONGO_HOST"]
  const dbName: string = 'stock'
  const mgoHelper = new MongoHelper(uri, dbName)
  const collName = "testCollection"
  const data = {
    name: "test1243",
    remark: "xxxx"
  }
  
  before('', ()=> {

  })

  it('insert one', async()=> {
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.insertData = data
    const res = await mgoHelper.insertOne(mq)
    // console.log("insert one", res)
    assert.equal(res.data.insertedCount, 1)
  })

  it('insert many', async()=> {
    const data2 = { name: "data2",remark: "data2"}
    const data3 = { name: "data3",remark: "data3"}
    const data4 = { name: "data3",remark: "data3"}
    const data5 = { name: "data3",remark: "data3"}
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.insertData = [data2, data3, data4, data5]
    const res = await mgoHelper.insertMany(mq)
    // console.log(res)
    assert.equal(res.data.insertedCount, 4)

  })

  it('find one', async()=> {
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.query = { name: "data2"}
    const res = await mgoHelper.findOne(mq)
    // console.log('find one', res)
    assert.equal(res.data.name, "data2")
  })

  it('find many', async()=> {
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.query = {}
    const res = await mgoHelper.findMany(mq)
    // console.log("find many", res)
    assert.isAtLeast(res.data.length, 2)
  })

  it('update one', async()=> {
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.query = { name: "data2"}
    mq.insertData = {
      $set: {
        name: "newData2",
      },
    }
    const res = await mgoHelper.updateOne(mq)
    // console.log("res", res)
    assert.equal(res.data.modifiedCount, 1)
  })

  it('update many', async()=> {
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.query = { name: "data3"}
    mq.insertData = {
      $set: {
        name: "newData3"
      }
    }
    const res = await mgoHelper.updateMany(mq)
    // console.log(res)
    assert.isAtLeast(res.data.modifiedCount, 2)
  })

  it('delete one', async()=> {
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.query = { name: "newData3"}
    const res = await mgoHelper.deleteOne(mq)
    // console.log('res', res)
    assert.equal(res.data.deletedCount, 1)

  })

  it('delete many', async()=> {
    const mq = new MongoQuery()
    mq.collectionName = collName
    mq.query = {}
    const res = await mgoHelper.deleteMany(mq)
    assert.isAtLeast(res.data.deletedCount, 2)
  })

})