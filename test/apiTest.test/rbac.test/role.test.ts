import axios from 'axios'
import { assert } from 'chai'

describe('role api test', ()=> {
  const url: string = 'http://localhost:3002/api/role'
  let testId = 0

  it('add role', async()=> {
    const rn = Math.floor(Math.random()* 999)
    const data = {
      name: `role${rn}`
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

  it('get role', async()=> {
    const getUrl = `${url}/${testId}`
    const res = await axios({
      method: 'GET',
      url: getUrl
    })
    // console.log('get role', res.data)
    assert.equal(res.data.data.id, testId)
  })

  it('role update', async()=> {
    const data = { name: 'newRole', id: testId}
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
    assert.equal(res2.data.data.name, 'newRole')
  })

  it('get role list', async()=> {
    const params = {}
    const res = await axios({
      method: 'GET',
      url,
      params
    })
    // console.log('role list', res.data)
    assert.isArray(res.data.data)
  })

  it('role del', async()=> {
    const res = await axios({
      method: 'DELETE',
      url: `${url}/${testId}`
    })
    // console.log('del role', res.data)
    const res2 = await axios({
      method: 'GET',
      url: `${url}/${testId}`
    })
    assert.equal(res2.data.data.message, 'no role find')

  })

  // it('the role is in the roleAuth table, can not delete'), async()=> {
    
  // }
})