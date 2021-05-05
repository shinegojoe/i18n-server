import axios from 'axios'
import { assert } from 'chai'


describe('userRole api test', ()=> {
  const url: string = 'http://localhost:3002/api/userRole'
  const userUrl: string = 'http://localhost:3002/api/user'
  const roleUrl: string = 'http://localhost:3002/api/role'
  let testId = 0
  let uid = 0
  let rid = 0
  it('inset userRole', async()=>{

    const addUser = await axios({
      method: 'POST',
      url: userUrl,
      data: {
        name: 'test123User',
        email: 'test123@gmail.com'
      }
    })
    const addRole = await axios({
      method: 'POST',
      url: roleUrl,
      data: {
        name: 'testRole'
      }
    })

    const roleRes = await axios({
      method: 'GET',
      url: roleUrl,
    })
    rid = roleRes.data.data[0].id
    const userRes = await axios({
      method: 'GET',
      url: userUrl,
    })
    uid = userRes.data.data[0].id

    const userRoleRes = await axios({
      method: 'POST',
      url: url,
      data: {
        rid: rid,
        uid: uid
      }
    })
    testId = userRoleRes.data.data.lastInsertRowid
    // console.log('userRole', userRoleRes.data)
    assert.equal(userRoleRes.data.data.changes, 1)
  })

  it('there no rid, the insert should be failed', async()=>{
    const res = await axios({
      url,
      method: 'POST',
      data: {
        rid: 9999,
        uid: uid
      }
    })
    // console.log('res', res.data)
    assert.equal(res.data.status, 'error')
  })
  it('there no uid, the insert should be failed', async()=>{
    const res = await axios({
      url,
      method: 'POST',
      data: {
        rid: rid,
        uid: 9999
      }
    })
    // console.log('res', res.data)
    assert.equal(res.data.status, 'error')

  })
  it('the uid and rid alreay exist', async()=>{
    const res = await axios({
      method: 'POST',
      url: url,
      data: {
        rid: rid,
        uid: uid
      }
    })
    // console.log('roleAuth', res.data)
    assert.equal(res.data.data.message, 'the userRole is exist')

  })
  it('userRole get', async()=>{
    const res = await axios({
      method: 'GET',
      url: `${url}/${testId}`,
    })
    // console.log('roleAuth get', res.data)
    assert.equal(res.data.data.id, testId)
  })

  it('userRole list', async()=>{
    const res = await axios({
      method: 'GET',
      url: url,
    })
    // console.log('roleAuth list', res.data)
    assert.isArray(res.data.data)

  })

  // it('roleAuth update', async()=>{
  //   const res = await axios({
  //     method: 'PUT',
  //     url: url,
  //     data: {
  //       id: 10,
  //       rid: 4,
  //       aid
  //     }
  //   })
  //   console.log('roleAuth update', res.data)
  //   // assert.equal()
  // })

  it('userRole delete', async()=>{
    const res = await axios({
      method: 'DELETE',
      url: `${url}/${testId}`
    })
    // console.log('res', res.data)
    assert.equal(res.data.data.changes, 1)

  })
})