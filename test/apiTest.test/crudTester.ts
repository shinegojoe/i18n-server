import axios from 'axios'
import { assert } from 'chai'

class CRUDTester {
  url: string
  id: number
  getPropertyName: string

  constructor(name: string, getPropertyName: string) {
    const host: any = process.env['HOST']
    const port: any = process.env['PORT']
    this.url = `http://${host}:${port}/api/${name}`
    this.id = 0
    this.getPropertyName = getPropertyName
  }

  add() {
    it('add', async() => {
      const res = await axios({
        method: 'POST',
        url: this.url,
        data: {
          name: 'xxx',
          coverPhoto: 'xxxx'
        }
      })
      this.id = res.data.data.lastInsertRowid
      assert.isNumber(this.id)
    })

  }

  list() {
    it('list', async()=> {
      const res = await axios({
        method: 'GET',
        url: this.url, 
      })
      assert.isArray(res.data.data)
    })

  }

  get() {
    it('get', async()=> {
      const res = await axios({
        method: 'GET',
        url: `${this.url}/${this.id}`
      })
      assert.property(res.data.data, this.getPropertyName)
    })

  }

  update() {
    it('update', async()=> {
      const res = await axios({
        method: 'PATCH',
        url: this.url,
        data: {
          id: this.id,
          name: 'new',
          coverPhoto: 'new.jpg'
        }
      })
      assert.equal(res.data.data.changes, 1)
    })

  }

  del() {
    it('delete', async() => {
      const res = await axios({
        method: 'DELETE',
        url: `${this.url}/${this.id}`
      })
      assert.equal(res.data.data.changes, 1)
    })

  }

  run() {
   this.add()
   this.list()
   this.get()
   this.update()
   this.del()
  }

}

export { CRUDTester }