import { db } from "../config/database.js"

class EmailDAO {
    constructor() {
        this.db = db;
    }

    createEmail(email) {
        const stmt = this.db.prepare(`
            INSERT INTO email (email, id_user, is_principal)
            VALUES (?,?,?)
        `);
        stmt.run(email.email, email.id_user, email.isPrincipal);
    }

    update(email) {
        const stmt = this.db.prepare(`UPDATE email SET email = ?, is_principal = ? WHERE id = ?`)
        return stmt.run(email.email, email.isPrincipal, email.id)
    }

    deleteEmailsByIdUser(id_user) {
        const stmt = this.db.prepare(`DELETE FROM email WHERE id_user = ?`);
        stmt.run(id_user);
    }

    delete(id) {
        const stmt = this.db.prepare(`DELETE FROM email WHERE id = ?`);
        stmt.run(id);
    }

    getEmailsByIdUser(id_user) {
        const stmt = this.db.prepare(`SELECT * FROM email WHERE id_user = ?`);
        return stmt.all(id_user);
    }
    getEmailPrincipal(id_user){
        const stmt = db.prepare(`SELECT * FROM email WHERE id_user = ? and is_principal = 'true'`)
        return stmt.get(id_user)
    }
    
}
export{
    EmailDAO
}
