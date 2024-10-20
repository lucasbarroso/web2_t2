import Database from 'better-sqlite3';

const db = new Database('dados.db', {
   verbose: console.log 
});

db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        cpf TEXT PRIMARY KEY UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL,
        created_at TEXT,
        updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS telephone (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT NOT NULL,
        cpf_user TEXT NOT NULL REFERENCES users, 
        is_principal BOOLEAN NOT NULL
    );

    CREATE TABLE IF NOT EXISTS email (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXTO NOT NULL,
        is_principal BOOLEAN NOT NULL,
        cpf_user TEXT NOT NULL REFERENCES users
    );
`);

export {
    db
}