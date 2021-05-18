import console from 'console'
import express from 'express'
import languageController from '../controller/language.controller'
import SqliteHelper from '../helper/DBHelper/sqlliteHelper'


const router = express.Router()

const apiString = '/download'

const dbPath: any = process.env['SQLITE_PATH']
const  sqliteHelper = new SqliteHelper(dbPath)

router.get(apiString, (req, res, next)=> {
    const pid = req.query.pid
    const langId = req.query.langId
    console.log('pid', pid, 'langId', langId)
    const sql_1 = `SELECT * from page WHERE projectId = $projectId`
    
    const db = sqliteHelper.connect()
    const s1 = db.prepare(sql_1)
    const pages = s1.all({
        projectId: pid
    })
    const data: any = {}
    console.log("pages", pages)
    for (const page of pages) {

        const sql_2 = `SELECT row.name, text.text FROM row INNER JOIN text ON row.id=text.rowId WHERE pageId=$pageId AND langId=$langId`
        const s2 = db.prepare(sql_2)
        const res = s2.all({
            pageId: page.id,
            langId: langId
        })
        console.log(res)
        const x: any = {}
        for(const item of res) {
            const name = item.name
            const text = item.text
            x[name] = text
        }
        const pageName = page.name
        data[pageName] = x
    }
    
    res.json({
        data: data
    })
})



export default router