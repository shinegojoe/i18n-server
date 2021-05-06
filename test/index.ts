// import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  // path: path.resolve(`./${process.env.NODE_ENV}.env`)
  path: './development.env'
})
import { ProjectTester } from './apiTest.test/project.test'
import { LanguageTester } from './apiTest.test/language.test'


const dbPath: any = process.env['SQLITE_PATH']
console.log('dbPath', dbPath)
describe('test start', ()=> {
  // require('./apiTest.test/project.test')
  const projectTester = new ProjectTester('project', 'name')
  projectTester.run()

  const langTester = new LanguageTester('language', 'name')
  langTester.run()
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
})