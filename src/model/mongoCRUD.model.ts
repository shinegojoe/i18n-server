// require('dotenv').config()
import { Request} from 'express'
import { MongoQuery, QueryResult } from '../helper/DBHelper/IQueryObj'
import MongoHelper from '../helper/DBHelper/mongoHelper'
import { Payload, MgoPayload } from '../helper/DBHelper/IQueryObj'

const uri: any = process.env['MONGO_HOST']
const dbName: any = process.env['MONGO_DBNAME']
const mgoHelper = new MongoHelper(uri, dbName)

const add = async(req: Request, payload: Payload) => {
  const p: MgoPayload = payload.data
  const mq1 = new MongoQuery()
  mq1.collectionName = p.collectionName
  mq1.query = req.body
  const findOne = await mgoHelper.findOne(mq1)
  console.log('findOne', findOne)
  if(findOne.data === null) {
    const mq2 = new MongoQuery()
    mq2.collectionName = p.collectionName
    mq2.insertData = req.body
    const data = await mgoHelper.insertOne(mq2)
    return data
  } else {
    const data = new QueryResult("data is exist")
    return data
  }
}

const get = (req: Request, payload: any) => {

}

const list = async(req: Request, payload: any) => {
  const p: MgoPayload = payload.data

  const mq = new MongoQuery()
  mq.collectionName = p.collectionName
  mq.query = req.query
  console.log("pay", req.query)
  const data = await mgoHelper.findMany(mq)
  // console.log('yy', req.body)
  return data
}

const del = async(req: Request, payload: any) => {
  const p: MgoPayload = payload.data

  const mq = new MongoQuery()
  mq.collectionName = p.collectionName
  mq.query = req.body
  const data = await mgoHelper.deleteMany(mq)
  return data
}

export default { add, get, list, del }