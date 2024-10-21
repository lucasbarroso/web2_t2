import { db } from "../config/database.js"

class TelephoneDAO {
    constructor() {
        this.db = db;
    }

    createTelephone(telephone) {
        const stmt = this.db.prepare(`
            INSERT INTO telephone (number, is_principal, cpf_user)
            VALUES (?, ?, ?)
        `);
        stmt.run(telephone.number, telephone.isPrincipal, telephone.cpfUser);
    }

    deleteTelephonesByCpf(cpfUser) {
        const stmt = this.db.prepare(`DELETE FROM telephone WHERE cpf_user = ?`);
        stmt.run(cpfUser);
    }

    getTelephonesByCpf(cpfUser) {
        const stmt = this.db.prepare(`SELECT * FROM telephone WHERE cpf_user = ?`);
        return stmt.all(cpfUser);
    }
}

module.exports = TelephoneDAO;