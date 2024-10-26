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

    deleteTelephonesByIdUser(id_user) {
        const stmt = this.db.prepare(`DELETE FROM telephone WHERE id_user = ?`);
        stmt.run(id_user);
    }

    getTelephonesByIdUser(id_user) {
        const stmt = this.db.prepare(`SELECT * FROM telephone WHERE id_user = ?`);
        return stmt.all(id_user);
    }
    getTelephonePrincipal(id_user){
        const stmt = db.prepare(`SELECT * FROM telephone WHERE id_user = ? and is_principal = true`)
        return stmt.get(id_user)
    }
}

export {
    TelephoneDAO
} 