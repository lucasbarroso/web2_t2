import { db } from "../config/database.js"

class EmailDAO {
    constructor() {
        this.db = db;
    }

    createEmail(email) {
        const stmt = this.db.prepare(`
            INSERT INTO email (email, id_user)
            VALUES (?,?)
        `);
        stmt.run(email.email, email.cpfUser);
    }

    deleteEmailsById(id_user) {
        const stmt = this.db.prepare(`DELETE FROM email WHERE id_user = ?`);
        stmt.run(id_user);
    }

    getEmailsById(id_user) {
        const stmt = this.db.prepare(`SELECT * FROM email WHERE id_user = ?`);
        return stmt.all(id_user);
    }
}
export{
    EmailDAO
}
