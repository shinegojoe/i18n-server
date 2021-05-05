

class ServerResp {
  status: string
  data: any
  constructor(data: any, status: string = 'ok') {
    this.data = data
    this.status = status
  }
}

export default ServerResp