import axios from 'axios'
import { assert } from 'chai'


describe('roleAuth api test', ()=> {
  const url: string = 'http://localhost:3002/api/roleAuth'
  const roleUrl: string = 'http://localhost:3002/api/role'
  const authUrl: string = 'http://localhost:3002/api/auth'
  let testId = 0
  let rid = 0
  let aid = 0
  it('inset roleAuth', async()=>{
    const roleRes = await axios({
      method: 'GET',
      url: roleUrl,
    })
    rid = roleRes.data.data[0].id
    const authRes = await axios({
      method: 'GET',
      url: authUrl,
    })
    aid = authRes.data.data[0].id

    const roleAuthRes = await axios({
      method: 'POST',
      url: url,
      data: {
        rid: rid,
        aid: aid
      }
    })
    testId = roleAuthRes.data.data.lastInsertRowid
    // console.log('roleAuth', roleAuthRes.data)
    assert.equal(roleAuthRes.data.data.changes, 1)
  })

  it('there no rid, the insert should be failed', async()=>{
    const res = await axios({
      url,
      method: 'POST',
      data: {
        rid: 9999,
        aid: 18
      }
    })
    // console.log('res', res.data)
    assert.equal(res.data.status, 'error')
  })
  it('there no aid, the insert should be failed', async()=>{
    const res = await axios({
      url,
      method: 'POST',
      data: {
        rid: 2,
        aid: 9999
      }
    })
    // console.log('res', res.data)
    assert.equal(res.data.status, 'error')

  })
  it('the rid and aid alreay exist', async()=>{
    const res = await axios({
      method: 'POST',
      url: url,
      data: {
        rid: rid,
        aid: aid
      }
    })
    // console.log('roleAuth', res.data)
    assert.equal(res.data.data.message, 'the roleAuth is exist')

  })
  it('roleAuth get', async()=>{
    const res = await axios({
      method: 'GET',
      url: `${url}/${testId}`,
    })
    console.log('roleAuth get', res.data)
    assert.equal(res.data.data.id, testId)
  })

  it('roleAuth list', async()=>{
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

  it('roleAuth delete', async()=>{
    const res = await axios({
      method: 'DELETE',
      url: `${url}/${testId}`
    })
    // console.log('res', res.data)
    assert.equal(res.data.data.changes, 1)

  })
})