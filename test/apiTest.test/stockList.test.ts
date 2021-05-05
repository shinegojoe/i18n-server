import axios from 'axios'
import { assert } from 'chai'
import httpStatus from 'http-status'


describe('', async()=> {
  const url: string = 'http://localhost:3000/api/stockList'

  it('stockList add', async()=> {
    const data = {
      name: "testData"
    }
    const res = await axios.post(url, data)
    // console.log('post res', res.data)
    assert.equal(res.data.data.insertedCount, 1)

  })

  it('stockList list', async()=> {
    const res = await axios({
      method: 'get',
      url: url,
      data: {
        name: 'testData'
      }
    })
    console.log('okok', res.data)
    assert.equal(res.status, httpStatus.OK)
    assert.isArray(res.data.data)

  })

  it('stockList del', async()=> {
    const res = await axios({
      method: 'delete',
      url: url,
      data: {
        name: 'testData'
      }
    })
    // console.log('delete', res.data)
    assert.isAtLeast(res.data.data.deletedCount,1)
  })
})