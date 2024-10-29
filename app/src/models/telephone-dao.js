import { db } from "../config/database.js"

class TelephoneDAO {
    constructor() {
        this.db = db;
    }

    createTelephone(telephone) {
        const stmt = this.db.prepare(`
            INSERT INTO telephone (number,  id_user, is_principal)
            VALUES (?,?,?)
        `);
        stmt.run(telephone.number, telephone.id_user, telephone.isPrincipal);
    }

    update(telephone) {
        const stmt = this.db.prepare(`UPDATE telephone SET number = ?, is_principal = ? WHERE id = ?`)
        return stmt.run(telephone.number, telephone.isPrincipal, telephone.id)
    }

    deleteTelephonesByIdUser(id_user) {
        const stmt = this.db.prepare(`DELETE FROM telephone WHERE id_user = ?`);
        stmt.run(id_user);
    }

    delete(id) {
        const stmt = this.db.prepare(`DELETE FROM telephone WHERE id = ?`);
        stmt.run(id);
    }

    getTelephonesByIdUser(id_user) {
        const stmt = this.db.prepare(`SELECT * FROM telephone WHERE id_user = ?`);
        return stmt.all(id_user);
    }
    getTelephonePrincipal(id_user){
        const stmt = db.prepare(`SELECT * FROM telephone WHERE id_user = ? and is_principal = 'true'`)
        return stmt.get(id_user)
    }
}

export {
    TelephoneDAO
} 