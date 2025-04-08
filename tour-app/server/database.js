const Database = require('better-sqlite3');
const path = require('path');

// Initialize database
const db = new Database(path.join(__dirname, 'chat.db'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    text TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Prepare statements
const statements = {
  // User statements
  insertUser: db.prepare('INSERT OR REPLACE INTO users (id, username) VALUES (?, ?)'),
  getUser: db.prepare('SELECT * FROM users WHERE id = ?'),
  getAllUsers: db.prepare('SELECT * FROM users'),
  
  // Message statements
  insertMessage: db.prepare(`
    INSERT INTO messages (user_id, text, is_admin, timestamp)
    VALUES (?, ?, ?, datetime('now', 'localtime'))
  `),
  getUserMessages: db.prepare(`
    SELECT messages.*, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
    WHERE user_id = ?
    ORDER BY timestamp ASC
  `),
  getAllMessages: db.prepare(`
    SELECT messages.*, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY timestamp DESC
  `)
};

module.exports = {
  // User operations
  createUser: (id, username) => {
    return statements.insertUser.run(id, username);
  },
  
  getUser: (id) => {
    return statements.getUser.get(id);
  },
  
  getAllUsers: () => {
    return statements.getAllUsers.all();
  },
  
  // Message operations
  saveMessage: (userId, text, isAdmin) => {
    return statements.insertMessage.run(userId, text, isAdmin ? 1 : 0);
  },
  
  getUserMessages: (userId) => {
    return statements.getUserMessages.all(userId);
  },
  
  getAllMessages: () => {
    return statements.getAllMessages.all();
  }
}; 