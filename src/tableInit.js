const sqlite3 = require('better-sqlite3')


const dbInit = (dbPath) => {
  const db = new sqlite3(dbPath, { verbose: console.log })
  return db
}

const createProject = () => {
  const sql = `CREATE TABLE project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('project table', res)
}

const createPage = () => {
  const sql = `CREATE TABLE page (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL,
    projectId INTEGER NOT NULL
    FOREIGN KEY("projectId") REFERENCES "project"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('page table', res)
}

const createLang = () => {
  const sql = `CREATE TABLE language (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('lang table', res)
}


const createRow = () => {
  const sql = `CREATE TABLE row (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    text TEXT NOT NULL,
    langId INTEGER NOT NULL,
    pageId INTEGER NOT NULL,
    FOREIGN KEY("langId") REFERENCES "language"("id"),
    FOREIGN KEY("pageId") REFERENCES "page"("id")
);`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('row table', res)
}

const createProjectLang = () => {
  const sql = `CREATE TABLE dividend (
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
  const dbPath = '../testDB.db'
  const db = dbInit(dbPath)
  const begin = db.prepare('BEGIN')
  const commit  = db.prepare('COMMIT')
  const rollback = db.prepare('ROLLBACK')
  begin.run()
  try {
    createProject(db)
    createPage(db)
    createLang(db)
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