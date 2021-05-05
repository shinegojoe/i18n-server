import axios from 'axios'
import { assert } from 'chai'
import httpStatus from 'http-status'

describe('', ()=> {
  const url: string = 'http://localhost:3000/api/stockInfo'

  it('stockinfo list', async()=> {
    const res = await axios({
      method: 'GET',
      url: url, 
      data: {
        name: '元大台灣50',
        mon: 4
      }
    })
    // console.log(res.data.data)
    assert.isArray(res.data.data)
  })

  
})