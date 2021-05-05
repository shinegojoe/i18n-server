import SqliteHelper from './sqlliteHelper'
import MongoHelper from './mongoHelper'
import { SqliteQuery, IQueryResult, MongoQuery } from './IQueryObj'

const sqliteTanscationTest = async() => {
 
  /* schema
  T1: {id: interger}, {name: string}
  T2: {id: interger}, {xxx: string}
  insert data2 should be threw a error, expect rollback
  */
  const sqlHelper = new SqliteHelper('testDB.db')
  const db = sqlHelper.connect()

  var begin = db.prepare('BEGIN');
  var commit = db.prepare('COMMIT');
  var rollback = db.prepare('ROLLBACK');

  begin.run()
  try {
      // doing stuff
      let sql = "INSERT INTO T1(name) VALUES ($name)"
      const data = { name: "qq5777" }
      const q = new SqliteQuery()
      q.sql = sql
      q.insertData = data
      const res: IQueryResult = await sqlHelper.insertOne(q)
      let sql2 = "INSERT INTO T2(xxx) VALUES ($xxx)"
      const data2 = {xxxPPP: "xxx"}
      const q2 = new SqliteQuery()
      q2.sql = sql2
      q2.insertData = data2
      const res2: IQueryResult = await sqlHelper.insertOne(q2)
      commit.run()
    
  
  } catch(e) {

  }
  finally {
      if(db.inTransaction) {
        rollback.run()
      }
      db.close()
  }
  
}

const mongoTranscationTest = async() => {
  /* note
  Transactions are undoubtedly the most exciting new feature in 
  MongoDB 4.0. But unfortunately, most tools for installing and 
  running MongoDB start a standalone server as opposed to a replica 
  set. If you try to start a session on a standalone server, you'll get this error.
  */
  /*
  after insert data1 throw a error, expect rollback
  */
  const uri: string = "mongodb://167.179.80.227:27017,167.179.80.227:27018,167.179.80.227:27019?replicaSet=rs"
  const db = 'stock'
  const mgoHelper = new MongoHelper(uri, db)
  const collName = "testCollection"

  const q = new MongoQuery()
  q.collectionName = collName
  q.insertData = {
    xxx: 12345
  }
  q.query = {}

  // const inXX = await mgoHelper.insertOne(q)
  
  const client = await mgoHelper.connect()

  // await client.db(db).collection(collName).insertOne(
  //   { xyz: 0 }, { writeConcern: { w: 'majority' } 
  // })
  // await client
  //   .db(db)
  //   .collection(collName)
  //   .insertOne({ abc: 0 }, { writeConcern: { w: 'majority' } });
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
    retryWrites: false

  };

  const session = client.startSession()
  try {
    await session.withTransaction(async()=> {
      const coll1 = client.db(db).collection(collName)
      const coll2 = client.db(db).collection(collName)
      await coll1.insertOne({ abc: 1 }, {session})
      throw Error('test error')
      await coll2.insertOne({ xyz: 999 }, { session })

    }, transactionOptions)
  } catch(e) {
    console.log(e)

  } finally {
    await session.endSession();
    await client.close();
  }


  const res = await mgoHelper.findMany(q)
  console.log('res', res)
}

// sqliteTanscationTest()
// mongoTranscationTest()