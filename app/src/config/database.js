import Database from 'better-sqlite3';

const db = new Database('dados.db', {
   verbose: console.log 
});

db.exec(`
    -- Tabela de usuários
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL,
    created_at TEXT,
    updated_at TEXT
);

-- Tabela de telefones
CREATE TABLE IF NOT EXISTS telephone (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL,
    id_user INTEGER NOT NULL,
    is_principal BOOLEAN NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);

-- Tabela de emails
CREATE TABLE IF NOT EXISTS email (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    is_principal BOOLEAN NOT NULL,
    id_user INTEGER NOT NULL,    
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);
`);

export {
    db
}