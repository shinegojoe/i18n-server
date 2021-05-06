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
  const projectTester = new ProjectTester('project', 'name')
  projectTester.run()
  const langTester = new LanguageTester('language', 'name')
  langTester.run()
})

