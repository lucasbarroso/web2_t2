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

    getByName(name){
        const stmt = db.prepare(`SELECT * FROM user WHERE name LIKE ?`)
        return stmt.all(`%${name}%`)
    }

    insert(user){
        const stmt = db.prepare(`INSERT INTO 
        user (cpf, name, password, is_admin, created_at) 
        VALUES (?, ?, ?, ?, ?)`)
        return stmt.run(user.cpf, user.name, user.password, user.isAdmin, user.createdAt)
    }

    update(user){
        const stmt = db.prepare(`UPDATE user SET name = ?, password = ?, updated_at = ? WHERE id = ?`)
        return stmt.run(user.name, user.password, user.updatedAt, user.id)
    }

    delete(id){
        const stmt = db.prepare(`DELETE FROM user WHERE id = ?`)
        return stmt.run(id)
    }
}

export {
    UserDAO
}
