import dotenv from 'dotenv'
dotenv.config({
  // path: path.resolve(`./${process.env.NODE_ENV}.env`)
  path: './development.env'
})

describe('test start', ()=> {
  // describe('sqlite test', ()=>{
  //   require('./dbTest.test/sqlite.test')
  // })
  // describe("mongo test", ()=> {
  //   require('./dbTest.test/mongo.test')
  // })

  // describe("api test", ()=> {
  //   // require('./apiTest.test/stockList.test')
  //   require('./apiTest.test/stockInfo.test')
  // })

  // describe('model test', ()=> {
  //   require('./modelTest.test/rbac.test/user.test')
  // })
  describe('api test', ()=> {
    
    // require('./apiTest.test/rbac.test/user.test')
    // require('./apiTest.test/rbac.test/role.test')
    // require('./apiTest.test/rbac.test/auth.test')
    // require('./apiTest.test/rbac.test/roleAuth.test')
    // require('./apiTest.test/rbac.test/userRole.test')
    // require('./apiTest.test/shop.test/item.test')
  })
})