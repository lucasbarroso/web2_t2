import { db } from "../config/database.js"

class UserDAO {
    getAll(){
        const stmt = db.prepare('SELECT * FROM user')
        return stmt.all()
    }
    

    getById(id){
        const stmt = db.prepare(`SELECT * FROM user WHERE id = ?`)
        return stmt.get(id)
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

    update(user){
        const stmt = db.prepare(`UPDATE user SET name = ?, password = ?, is_admin = ?, updated_at = ? WHERE cpf = ?`)
        return stmt.run(user.name, user.password, user.is_admin, user.updated_at, user.cpf)
    }

    delete(id){
        const stmt = db.prepare(`DELETE FROM user WHERE id = ?`)
        return stmt.run(id)
    }
}

export {
    UserDAO
}
