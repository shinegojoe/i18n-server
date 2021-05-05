import IDBHelper from './IDBHelper'
import { MongoClient } from 'mongodb'
import { IQueryObj, IQueryResult, QueryResult } from './IQueryObj'


class MongoHelper implements IDBHelper {
  uri: string
  dbName: string
  opt: object
  constructor(uri: string, dbName: string) {
    this.uri = uri
    this.dbName = dbName
    this.opt =  { useUnifiedTopology: true }

    console.log("this is mgo helper")
  }

  async connect(): Promise<any>{
    const client = new MongoClient(this.uri, this.opt)
    // const client = new MongoClient(this.uri)

    await client.connect()
    return client

  }
  async insertOne(q: IQueryObj): Promise<IQueryResult> {
    let client: any
    try {
      client = await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(q.collectionName)
      const res = await collection.insertOne(q.insertData)
      const queryRes = new QueryResult({
        insertedCount: res.insertedCount,
        insertedId: res.insertedId
      })
      return queryRes

    } catch(e) {
      throw e

    } finally {
      await client.close()
    }
  }

  async insertMany(q: IQueryObj, opt={}): Promise<IQueryResult> {

    let client: any
    try {
      client = await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(q.collectionName)
      const res = await collection.insertMany(q.insertData, opt)
      const queryRes = new QueryResult({
        insertedCount: res.insertedCount
      })
      return queryRes

    } catch(e) {
      throw e

    } finally {
      await client.close()
    }
  }

  async findOne(q: IQueryObj): Promise<IQueryResult> {
    let client: any
    try {
      client =  await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(q.collectionName)
      // Query for a movie that has the title 'Back to the Future'
      const res = await collection.findOne(q.query)
      return new QueryResult(res)
  
    } catch(e) {
      throw e

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close()
    }
  }
  async findMany(q: IQueryObj, options={}): Promise<IQueryResult>{
    let client: any
    const res: any[] = []
    try {
      client =  await this.connect()
      const database = client.db(this.dbName)
      const collection = database.collection(q.collectionName)
      // Query for a movie that has the title 'Back to the Future'
      const cursor = collection.find(q.query, options);
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
        return new QueryResult(res)
      }
      await cursor.forEach((element: any) => {
        // console.log(element)
        res.push(element)
      });
      return new QueryResult(res)

  
    } catch(e) {
      throw e

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close()
    }
  }
  async deleteOne(q: IQueryObj): Promise<IQueryResult> {
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(q.collectionName)
      const res = await collection.deleteOne(q.query)
      return new QueryResult({
        deletedCount: res.deletedCount
      })

    } catch(e) {
      throw e
    } finally{
      await client.close()
    }
  }

  async deleteMany(q: IQueryObj): Promise<IQueryResult> {
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(q.collectionName)
      const res = await collection.deleteMany(q.query)
      return new QueryResult({
        deletedCount: res.deletedCount
      })
    } catch(e) {
      throw e
    } finally{
      await client.close()
    }
  }

  async updateOne(q: IQueryObj):Promise<IQueryResult> {
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(q.collectionName)
      const res = await collection.updateOne(q.query, q.insertData)
      return new QueryResult({
        modifiedCount: res.modifiedCount,
        upsertedId: res.upsertedId,
        upsertedCount: res.upsertedCount,
        matchedCount: res.matchedCount
      })
    } catch(e) {
      throw e
    } finally{
      await client.close()
    }
  }

  async updateMany(q: IQueryObj): Promise<IQueryResult> {
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(q.collectionName)
      const res = await collection.updateMany(q.query, q.insertData)
      return new QueryResult({
        modifiedCount: res.modifiedCount,
        upsertedId: res.upsertedId,
        upsertedCount: res.upsertedCount,
        matchedCount: res.matchedCount
      })
    } catch(e) {
      throw e
    } finally{
      await client.close()
    }
  }

  async replace(q: IQueryObj, opt={}): Promise<IQueryResult>{
    let client: any
    try {
      client = await this.connect()
      const db = client.db(this.dbName)
      const collection = db.collection(q.collectionName)
      const res = await collection.replaceOne(q.query, q.insertData, opt)
      return new QueryResult(res.modifiedCount)

    } catch(e) {
      throw e
    } finally {
      await client.close()
    }
  }
}

export default MongoHelper