const sqlite3 = require('better-sqlite3')
var path = require('path')


const dbInit = (dbPath) => {
  const db = new sqlite3(dbPath, { verbose: console.log })
  return db
}

const createProject = (db) => {
  const sql = `CREATE TABLE project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL,
    coverPhoto TEXT NOT NULL default 'default.jpg'
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('project table', res)
}

const createPage = (db) => {
  const sql = `CREATE TABLE page (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL,
    projectId INTEGER NOT NULL,
    FOREIGN KEY("projectId") REFERENCES "project"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('page table', res)
}

const createLang = (db) => {
  const sql = `CREATE TABLE language (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL UNIQUE
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('lang table', res)
}

const createRow = (db) => {
  const sql = `CREATE TABLE row (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL,
    pageId INTEGER NOT NULL,
    sortId INTEGER NOT NULL,
    FOREIGN KEY("pageId") REFERENCES "page"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('row table', res)
}


const createText = (db) => {
  const sql = `CREATE TABLE text (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    text TEXT NOT NULL,
    rowId INTEGER NOT NULL,
    langId INTEGER NOT NULL,
    FOREIGN KEY("rowId") REFERENCES "row"("id"),
    FOREIGN KEY("langId") REFERENCES "language"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('text table', res)
}

const createProjectLang = (db) => {
  const sql = `CREATE TABLE projectLang (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    projectId INTEGER NOT NULL,
    langId INTEGER NOT NULL,
    FOREIGN KEY("projectId") REFERENCES "project"("id"),
    FOREIGN KEY("langId") REFERENCES "language"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('project table', res)
}


const main = () => {
  const root = path.resolve(__dirname).replace('/src', '')

  const dbPath = `${root}/testDB.db`
  const db = dbInit(dbPath)
  const begin = db.prepare('BEGIN')
  const commit  = db.prepare('COMMIT')
  const rollback = db.prepare('ROLLBACK')
  begin.run()
  try {
    createProject(db)
    createPage(db)
    createLang(db)
    createText(db)
    createRow(db)
    createProjectLang(db)
    commit.run()

  } catch(e) {
    console.log(e)
  } finally {
    if(db.inTransaction) {
      rollback.run()
    }
    db.close()
  }
}

main()