import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  // path: path.resolve(`./development.env`)
  path: './development.env'
})
import { ProjectTester } from './apiTest.test/project.test'
import { LanguageTester } from './apiTest.test/language.test'
import { PageTester } from './apiTest.test/page.test'
import { DeleteTester } from './dbTest.test/delete.test'

describe('test start', async()=> {
  // await addTestData()
  const delTester = new DeleteTester()
  delTester.run()
  // const projectTester = new ProjectTester('project', 'name')
  // projectTester.run()
  // const langTester = new LanguageTester('language', 'name')
  // langTester.run()
  // const pageTester = new PageTester('page', 'name')
  // pageTester.run()
})

