

const createStock = (db) => {
  const sql = `CREATE TABLE stock (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      name TEXT NOT NULL UNIQUE,
      code TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('stock table', res)
}

const createStockInfo = (db) => {
  const sql = `CREATE TABLE stockInfo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      stockId INTEGER NOT NULL,
      date TEXT  NOT NULL,
      year INTEGER NOT NULL,
      mon INTEGER NOT NULL,
      day INTEGER NOT NULL,
      allCount INTEGER NOT NULL,
      allMount INTEGER NOT NULL,
      open REAL NOT NULL,
      high REAL NOT NULL,
      low REAL NOT NULL,
      close REAL NOT NULL,
      delta REAL NOT NULL,
      stockCount NOT NULL,
      FOREIGN KEY("stockId") REFERENCES "stock"("id")

  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('stockInfo table', res)
}


const createDividend = (db) => {
  const sql = `CREATE TABLE dividend (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      stockId INTEGER NOT NULL,
      year INTEGER NOT NULL,
      EPS REAL NOT NULL,
      cash REAL NOT NULL,
      stock REAL NOT NULL,
      FOREIGN KEY("stockId") REFERENCES "stock"("id")
  );`
  const stmt = db.prepare(sql)
  const res = stmt.run()
  console.log('dividend table', res)
}


const main = (db) => {
  const begin = db.prepare('BEGIN')
  const commit  = db.prepare('COMMIT')
  const rollback = db.prepare('ROLLBACK')
  begin.run()
  try {
    createStock(db)
    createStockInfo(db)
    createDividend(db)

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

module.exports = main
// 