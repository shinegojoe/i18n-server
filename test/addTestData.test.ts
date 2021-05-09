import SqliteHelper from '../src/helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../src/helper/DBHelper/IQueryObj'

// const dbPath: any = process.env['SQLITE_PATH']
const dbPath: any = 'testDB.db'
console.log(dbPath)
const sqliteHelper = new SqliteHelper(dbPath)

const getRN = ()=> {
    const index = Math.floor(Math.random() * 999)
    return index
}

const addProject = async() => {
    const projectData = {
        name: `test project ${getRN()}`,
        coverPhoto: ''
    }
    const q1 = new SqliteQuery()
    q1.insertData = projectData
    q1.sql = 'INSERT or IGNORE INTO project(name, coverPhoto) VALUES ($name, $coverPhoto)'
    const res =  await sqliteHelper.insertOne(q1)
    return res
}

const addPage = async(projectId: number) => {
    const pageData = {
        name: `testPage_${getRN()}`,
        projectId: projectId
    }
    const q = new SqliteQuery()
    q.sql = 'INSERT or IGNORE INTO page(name, projectId) VALUES ($name, $projectId)'
    q.insertData = pageData
    const res = await sqliteHelper.insertOne(q)
    return res
}

const addLang = async() => {
    const langData = {
        name: `testlang_${getRN()}`
    }
    const q = new SqliteQuery()
    q.sql = 'INSERT or IGNORE INTO language(name) VALUES ($name)'
    q.insertData = langData
    const res = await sqliteHelper.insertOne(q)
    return res
}

const addRow = async(pageId: number, langId: number) => {
    const rowData = {
        text: `testRow_${getRN()}`,
        pageId,
        langId,
        sortId: 1
    }
    const q = new SqliteQuery()
    q.sql = 'INSERT or IGNORE INTO row(text, pageId, langId, sortId) VALUES \
    ($text, $pageId, $langId, $sortId)'
    q.insertData = rowData
    const res = await sqliteHelper.insertOne(q)
    return res
}

const addProjectLang = async(projectId: number, langId: number) => {
    const ProjectLang = {
        name: `testPage_${getRN()}`,
        projectId,
        langId
    }
    const q = new SqliteQuery()
    q.sql = 'INSERT or IGNORE INTO ProjectLang(projectId, langId) VALUES ($projectId, $langId)'
    q.insertData = ProjectLang
    const res = await sqliteHelper.insertOne(q)
    return res
}

const addTestData = async() => {
    const project = await addProject()   
    // console.log('res', project)
    const page = await addPage(project.lastInsertRowid)
    const lang = await addLang()
    const row = await addRow(page.lastInsertRowid, lang.lastInsertRowid)
    const projectLang = await addProjectLang(project.lastInsertRowid, lang.lastInsertRowid)
    return {
        projectId: project.lastInsertRowid,
        pageId: page.lastInsertRowid,
        langId: lang.lastInsertRowid,
        rowId: row.lastInsertRowid,
        projectLangId: projectLang.lastInsertRowid
    }

}
export default addTestData