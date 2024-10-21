import { db } from "../config/database.js"

class EmailDAO {
    constructor() {
        this.db = db;
    }

    createEmail(email) {
        const stmt = this.db.prepare(`
            INSERT INTO email (email, is_principal, cpf_user)
            VALUES (?, ?, ?)
        `);
        stmt.run(email.email, email.isPrincipal, email.cpfUser);
    }

    deleteEmailsByCpf(cpfUser) {
        const stmt = this.db.prepare(`DELETE FROM email WHERE cpf_user = ?`);
        stmt.run(cpfUser);
    }

    getEmailsByCpf(cpfUser) {
        const stmt = this.db.prepare(`SELECT * FROM email WHERE cpf_user = ?`);
        return stmt.all(cpfUser);
    }
}

module.exports = EmailDAO