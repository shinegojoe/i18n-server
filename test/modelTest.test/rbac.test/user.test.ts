import chai, { expect, assert } from 'chai'
import userModel from '../../../src/modules/rbac/model/user.model'


describe('rbac test', ()=> {
  let testId = 0
  let testEmail = ''
  it('add a new user', async()=> {
    const index = Math.floor(Math.random()* 999)
    testEmail = `test${index}@gmail.com`
    const req: any = {
      body: {
        name: 'testUser',
        email: testEmail
      }
    }
    const res = await userModel.add(req)
    // console.log('add new user', res)
    testId = res.data.lastInsertRowid
    assert.equal(res.data.changes, 1, 'the change count shuld be 1')
  })

  it('add a existed email', async()=> {
    const req: any = {
      body: {
        name: 'testUser',
        email: testEmail
      }
    }
    const res = await userModel.add(req)
    // console.log('add existed user', res)
    assert.equal(res.data.changes, 0, 'the change count should be 0')
  })

  it('get one user', async()=> {
    // const req: any = {
    //   query: {email: 'test123@gmail.com'}
    // }
    const req: any = {
      query: {id: 4}
    }
    const res = await userModel.get(req)
    // console.log('get one user', res)
    assert.isNumber(res.data.id, "the id should be a number")
  })

  it('update user', async()=> {
    const req: any = {
      body: {
        id: testId,
        name: "xxx"
      }
    }
    const res = await userModel.update(req)
    // console.log('update user', res)
    const req2: any = {
      query: { id: testId}
    }
    const res2 = await userModel.get(req2)
    // console.log('res2', res2)
    assert.equal(res2.data.name, 'xxx')
  })

  it('user list', async()=> {
    const req: any = {
      query: {}
    }
    const res = await userModel.list(req)
    // console.log('user list', res)
    assert.isArray(res.data, 'user list should be a array')
  })

  it('del user', async()=> {
    const req: any = {
      body: {id: testId}
    }
    const res = await userModel.del(req)
    // console.log('del user', res)
    assert.equal(res.data.changes, 1)
  })
})