const sqlite3 = require('sqlite3').verbose();
const config = require('./config');
const db = new sqlite3.Database(config.db.file);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    username TEXT,
    body TEXT
  )`);
});

module.exports = db;
