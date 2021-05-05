

export interface IQueryObj {
  sql: string
  query: any
  insertData: any
  tabName: string
  collectionName: string
}

export interface IQueryResult {
  data: any
}

export class Payload {
  data: any
}



export class MgoPayload {
  collectionName: string = ''
  constructor(collectionName: string) {
    this.collectionName = collectionName
  }
}

// export class MongoPayload implements IPayload  {
//   payload: MgoPayloadData 
//   constructor(collName: string) {
//     this.payload = new MgoPayloadData(collName)
//   }
//   getPayload(): MgoPayloadData {
//     return this.payload
//   }
// }





export class QueryResult implements IQueryResult {
  data: any
  status: string = 'ok'
  constructor(res: any) {
    this.data = res
    
  }
  // public get data() {
  //   return this._data
  // }
}

// class MgoQuery implements IQueryObj {

// }

export class SqliteQuery implements IQueryObj {
  private _sql: string = ''
  private _query: any = undefined
  private _insertData: any = undefined
  private _tabName: string = ''
  collectionName: string = ''

  
  constructor() {
  }

  public set sql(sql: string) {
    this._sql = sql
  }
  public get sql() {
    return this._sql
  }

  public set query(query: any) {
    this._query = query
  }
  public get query() {
    return this._query
  }

  public set insertData(data: any) {
    this._insertData = data
  }
  public get insertData() {
    return this._insertData
  }

  public set tabName(name: string) {
    this._tabName = name 
  }
  public get tabName() {
    return this._tabName
  }

  
}

export class MongoQuery implements IQueryObj {
  sql: string = ''
  private _query: any = undefined
  private _insertData: any = undefined
  tabName: string = ''
  private _collectionName = ''

  public set query(q: any) {
    this._query = q
  }
  public get query() {
    return this._query
  }

  public set insertData(data: any) {
    this._insertData = data
  }
  public get insertData() {
    return this._insertData
  }

  public set collectionName(name: string) {
    this._collectionName = name
  }
  public get collectionName() {
    return this._collectionName
  }

}