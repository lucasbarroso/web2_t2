import { db } from "../config/database.js";
// import { User } from "./user-model.js";

const EmailDAO = require('./EmailDAO');
const TelephoneDAO = require('./TelephoneDAO');

class UserDAO {
    constructor() {
        this.db = db;
        this.emailDAO = new EmailDAO();
        this.telephoneDAO = new TelephoneDAO();
    }

    createUser(user) {
        const stmt = this.db.prepare(`
            INSERT INTO user (cpf, name, password, is_admin, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        stmt.run(user.cpf, user.name, user.password, user.isAdmin, user.createdAt, user.updatedAt);

    }

    updateUser(user) {
        const stmt = this.db.prepare(`
            UPDATE user SET name = ?, password = ?, is_admin = ?, updated_at = ?
            WHERE cpf = ?
        `);
        stmt.run(user.name, user.password, user.isAdmin, user.updatedAt, user.cpf);

        this.emailDAO.deleteEmailsByCpf(user.cpf);
        user.emails.forEach(email => {
            this.emailDAO.createEmail({ ...email, cpfUser: user.cpf });
        });

        this.telephoneDAO.deleteTelephonesByCpf(user.cpf);
        user.telephones.forEach(phone => {
            this.telephoneDAO.createTelephone({ ...phone, cpfUser: user.cpf });
        });
    }

    getUserByCpf(cpf) {
        const stmt = this.db.prepare(`SELECT * FROM user WHERE cpf = ?`);
        const user = stmt.get(cpf);

        if (user) {
            user.emails = this.emailDAO.getEmailsByCpf(cpf);
            user.telephones = this.telephoneDAO.getTelephonesByCpf(cpf);
        }

        return user;
    }

    deleteUser(cpf) {
        const stmt = this.db.prepare(`DELETE FROM user WHERE cpf = ?`);
        stmt.run(cpf);
    }
}

export {
    UserDAO
}