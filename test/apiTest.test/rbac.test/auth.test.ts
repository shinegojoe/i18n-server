import axios from 'axios'
import { assert } from 'chai'

describe('auth api test', ()=> {
  const url: string = 'http://localhost:3002/api/auth'
  let testId = 0

  it('add auth', async()=> {
    const rn = Math.floor(Math.random()* 999)
    const data = {
      name: `auth${rn}`
    }
    const res = await axios({
      method: 'POST',
      url,
      data
    })
    // console.log('add role', res.data)
    testId = res.data.data.lastInsertRowid
    assert.equal(res.data.data.changes, 1)

  })

  it('get auth', async()=> {
    const getUrl = `${url}/${testId}`
    const res = await axios({
      method: 'GET',
      url: getUrl
    })
    // console.log('get role', res.data)
    assert.equal(res.data.data.id, testId)
  })

  it('auth update', async()=> {
    const data = { name: 'newAuth', id: testId}
    const res = await axios({
      method: 'PUT',
      url,
      data
    })
    // console.log('role update', res.data)
    const res2 = await axios({
      method: 'GET',
      url: `${url}/${testId}`
    })
    assert.equal(res2.data.data.name, 'newAuth')
  })

  it('get auth list', async()=> {
    const params = {}
    const res = await axios({
      method: 'GET',
      url,
      params
    })
    // console.log('role list', res.data)
    assert.isArray(res.data.data)
  })

  it('auth del', async()=> {
    const res = await axios({
      method: 'DELETE',
      url: `${url}/${testId}`
    })
    // console.log('del role', res.data)
    const res2 = await axios({
      method: 'GET',
      url: `${url}/${testId}`
    })
    assert.equal(res2.data.data.message, 'no auth find')

  })

  // it('the auth is in the roleAuth table, can not delete'), async()=> {
    
  // }
})