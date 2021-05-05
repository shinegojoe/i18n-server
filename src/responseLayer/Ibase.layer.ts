import { IQueryResult } from '../helper/DBHelper/IQueryObj'
import ServerResp from './serverResp'

interface IBaseLayer {
  add(data: IQueryResult, name: string): ServerResp
  list(data: IQueryResult, name: string): IQueryResult
  get(data: IQueryResult, name: string): IQueryResult
  update(data: IQueryResult, name: string): IQueryResult
  del(data: IQueryResult, name: string): IQueryResult
}

export { IBaseLayer }