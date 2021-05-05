import axios from 'axios'
import { assert } from 'chai'

describe('rbac user test', ()=> {
  const url: string = 'http://localhost:3002/api/user'
  let testId = 0

  it('not validition email', async()=> {
    const data = {
      name: 'mailWrong',
      email: 'mailWrong'
    }
    const res = await axios({
      method: 'POST',
      url,
      data
    })
    // console.log('wrong mail', res.data)
    assert.isString(res.data.data.message, 'error msg should be string')
  })

  
  it('add user', async()=> {
    const rn = Math.floor(Math.random()* 999)
    const data = {
      name: "user1234",
      email: `user${rn}@gmail.com.tw`
    }
    const res = await axios({
      method: 'POST',
      url,
      data
    })
    // console.log('add user', res.data)
    testId = res.data.data.lastInsertRowid
    assert.equal(res.data.data.changes, 1)
  })

  it('get user', async()=> {
    const getUrl = `${url}/${testId}`
    const res = await axios({
      method: 'GET',
      url: getUrl
    })
    // console.log('get user', res.data)
    assert.equal(res.data.data.id, testId)
  })

  it('update user', async()=> {
    const data = {
      id: testId,
      name: 'new1234'
    }
    const res = await axios({
      method: 'PUT',
      url,
      data
    })
    // console.log('update user', res.data)
    assert.equal(res.data.data.changes, 1)
   
  })

  it('delete user', async()=> {
    const res = await axios({
      method: 'DELETE',
      url: `${url}/${testId}`
    })
    // console.log('delete user', res.data)
    assert.equal(res.data.data.changes, 1)
  })

  it('user list', async()=> {
    const params = {}
    const res = await axios({
      method: 'GET',
      url,
      params
    })
    // console.log('user list', res.data)
    assert.isArray(res.data.data)
  })
})