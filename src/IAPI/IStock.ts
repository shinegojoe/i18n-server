
interface IStockInfoReq {

}

interface IStockInfoResp {

}

interface IStockListReq {

}

interface IStockListResp {

}

interface IDividendReq {
  name: string
  code: string
  year: number
  EPS: number
  cash: number
  stock: number
}

interface IDividendResp {

}

export type {IStockInfoReq, IStockInfoResp, IStockListReq, IStockListResp, 
IDividendReq, IDividendResp }