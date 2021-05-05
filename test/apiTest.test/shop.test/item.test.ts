import axios from 'axios'
import { assert } from 'chai'

describe('item api test', async()=> {
  const url: string = 'http://localhost:3002/api/item'
  let itemId = 0
  
  let uid = 0
  before(async()=> {
    const user = await axios({
      method: 'GET',
      url: 'http://localhost:3002/api/user'
    })
    // console.log('user', user.data)
    uid = user.data.data[0].id

  })

  it('add item', async()=> {

    const item = {
      uid: uid,
      title: `test item ${Math.floor(Math.random()* 999)}`,
      intro: 'this is the test item',
      imgUrl: 'http://www.xxx.123',
      price: 100
    }
    const res = await axios({
      method: "POST",
      url,
      data: item
    })
    // console.log('add item', res.data)
    assert.equal(res.data.data.changes, 1)
    
  })

  it('add item fail, there is no user id', async()=> {
    const item = {
      uid: 99666,
      title: 'test item xx',
      intro: 'this is the test item',
      imgUrl: 'http://www.xxx.123',
      price: 100
    }
    const res = await axios({
      method: "POST",
      url,
      data: item
    })
    // console.log('add item', res.data)
    assert.equal(res.data.status, 'error')
    
  })

  it('get item list', async()=> {
    const res = await axios({
      method: 'GET',
      url,
    })
    // console.log('item list', res.data)
    itemId = res.data.data[0].id
    assert.isArray(res.data.data)
    
  })

  it('get item', async()=> {
    const res = await axios({
      method: 'GET',
      url: `${url}/${itemId}`
    })
    // console.log('get item', res.data)
    assert.equal(res.data.data.id, itemId)
  })

  it('update item', async()=> {
    const newItem = {
      id: itemId,
      uid: uid,
      title: 'newtest item xx qqq xxxx',
      intro: 'new this is the test itemzzzz',
      imgUrl: 'new http://www.xxx.123',
      price: 999
    }
    const res = await axios({
      method: 'PUT',
      url, 
      data: newItem
    })
    // console.log('update item', res.data)
    assert.equal(res.data.data.changes, 1)

    
  })

  it('delete item', async()=> {
    const res = await axios({
      method: 'DELETE',
      url: `${url}/${itemId}`
    })
    // console.log('delete item', res.data)
    assert.equal(res.data.data.changes, 1)

  })

  
})