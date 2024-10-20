import { db } from "../config/database.js"

class UserDao {
    getAll(){
        const stmt = db.prepare('SELECT * FROM user')
        return stmt.all()
    }

    getByCpf(cpf){
        const stmt = db.prepare(`SELECT * FROM user WHERE cpf = ?`)
        return stmt.get(cpf)
    }

    insert(user){
        const stmt = db.prepare(`INSERT INTO 
        user (cpf, name, password, is_admin, created_at) 
        VALUES (?, ?, ?, ?, ?)`)
        return stmt.run(user.cpf, user.name, user.password, user.isAdmin, user.createdAt)
    }

    update(cpf, name, password, is_admin, updated_at){
        const stmt = this.db.prepare(`UPDATE user SET name = ?, password = ?, is_admin = ?, updated_at = ? WHERE cpf = ?`)
        return stmt.run(name, password, is_admin, updated_at, cpf)
    }

    delete(cpf){
        const stmt = this.db.prepare(`DELETE FROM user WHERE cpf = ?`)
        return stmt.run(cpf)
    }
}

export {
    UserDao
}