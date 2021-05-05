import ServerResp from './serverResp'

interface IResp {
  resp(data: any): ServerResp
}

class BaseResp implements IResp {
  resp(data: any): ServerResp {
    return new ServerResp(data)
  }
}

export { IResp, BaseResp, ServerResp }