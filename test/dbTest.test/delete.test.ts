import addTestData from '../addTestData.test'
import SqliteHelper, { ISqliteResp } from '../../src/helper/DBHelper/sqlliteHelper'
import { SqliteQuery } from '../../src/helper/DBHelper/IQueryObj'
import { assert } from 'chai'

const sqliteHelper = new SqliteHelper('testDB.db')

class DeleteTester {

    async deleteItem(tableName: string, id: number) {
        const q = new SqliteQuery()
        q.sql = `DELETE from ${tableName} WHERE id = $id`
        q.query = {
            id
        }
        q.tabName = tableName
        const res = await sqliteHelper.deleteOne(q) as ISqliteResp
        return res
    }

    async deleteRow() {
        const testData: any = await addTestData()
        const res = await this.deleteItem('row', testData.rowId)
        return res
    }

    async deletePage() {
        const testData: any = await addTestData()
        // console.log(testData)
        const xx = await this.deleteItem('row', testData.rowId)
        // console.log('xxx', xx)
        const res = await this.deleteItem('page', testData.pageId)
        return res
    }


    async deleteProjectLang() {
        const testData: any = await addTestData()
        const res = await this.deleteItem('projectLang', testData.projectLangId)
        return res
    }

    async deleteLang() {
        const testData: any = await addTestData()
        await this.deleteItem('row', testData.rowId)
        await this.deleteItem('projectLang', testData.projectLangId)
        const res = await this.deleteItem('language', testData.langId)
        return res
    }

    async deleteProject() {
        const testData: any = await addTestData()
        await this.deleteItem('row', testData.rowId)
        await this.deleteItem('page', testData.pageId)
        await this.deleteItem('projectLang', testData.projectLangId)
        await this.deleteItem('language', testData.langId)
        const res = await this.deleteItem('project', testData.projectId)
        return res
    }

    run() {
        it('delete row', async () => {
            const res = await this.deleteRow()
            // console.log('res', res)
            assert.equal(res.changes, 1)
        })

        it('delete page', async () => {
            const res = await this.deletePage()
            // console.log('res', res)
            assert.equal(res.changes, 1)
        })

        it('delete projectLang', async () => {
            const res = await this.deleteProjectLang()
            // console.log('res', res)
            assert.equal(res.changes, 1)
        })

        it('delete lang', async () => {
            const res = await this.deleteLang()
            // console.log('res', res)
            assert.equal(res.changes, 1)
        })

        it('delete project', async () => {
            const res = await this.deleteProject()
            // console.log('res', res)
            assert.equal(res.changes, 1)
        })


    }
}

export { DeleteTester }