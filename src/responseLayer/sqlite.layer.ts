import { BaseResp, ServerResp } from './base.layer'


class Add implements BaseResp{
  resp(data: any): ServerResp {
    return new ServerResp(data)
  }
}

class Get {
  resp(data: any): ServerResp {
    return new ServerResp(data)
  }
}


class List {
  resp(data: any): ServerResp {
    return new ServerResp(data)
  }
}

class Update {
  resp(data: any): ServerResp {
    return new ServerResp(data)
  }
}

class Del {
  resp(data: any): ServerResp {
    return new ServerResp(data)
  }
}


export { Add, Get, List, Update, Del}