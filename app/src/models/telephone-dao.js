import { db } from "../config/database.js"

class TelephoneDAO {
    constructor() {
        this.db = db;
    }

    createTelephone(telephone) {
        const stmt = this.db.prepare(`
            INSERT INTO telephone (number,  id_user)
            VALUES (?, ?)
        `);
        stmt.run(telephone.number, telephone.id_user);
    }

    deleteTelephonesById(id_user) {
        const stmt = this.db.prepare(`DELETE FROM telephone WHERE id_user = ?`);
        stmt.run(id_user);
    }

    getTelephonesById(id_user) {
        const stmt = this.db.prepare(`SELECT * FROM telephone WHERE id_user = ?`);
        return stmt.all(id_user);
    }
}

export {
    TelephoneDAO
} 