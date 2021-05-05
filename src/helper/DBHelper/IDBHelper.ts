import { IQueryObj, IQueryResult } from './IQueryObj'

interface IDBHelper {
  connect():any
  // insertOne(collectionName: string, data: object): object
  // insertMany(collectionName: string, data: object, opt: object): any
  // findOne(collectionName: string,sql: any, query: any): object
  // findMany(collectionName: string, query: any, options: object): object
  // deleteOne(collectionName: string, query: object): any
  // deleteMany(collectionName: string, query: object): any
  // updateOne(collectionName: string, query: object, data: object): any
  // replace(collectionName: string, quety: object, data: object, opt: object): any
  findOne(queryObj: IQueryObj): Promise<IQueryResult>
  findMany(queryObj: IQueryObj): Promise<IQueryResult>
  insertOne(queryObj: IQueryObj): Promise<IQueryResult>
  insertMany(queryObj: IQueryObj): Promise<IQueryResult>
  deleteOne(queryObj: IQueryObj): Promise<IQueryResult>
  deleteMany(queryObj: IQueryObj): Promise<IQueryResult>
  updateOne(queryObj: IQueryObj): Promise<IQueryResult>
  updateMany(queryObj: IQueryObj): Promise<IQueryResult>



}

export default IDBHelper