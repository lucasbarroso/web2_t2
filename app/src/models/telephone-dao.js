import { db } from "../config/database.js"

class TelephoneDao {

    getByUser(cpf_user){
        const stmt = db.prepare('SELECT * FROM telephone WHERE cpf_user = ?')
        return stmt.all(cpf_user)
    }

    getTelephonePrincipal(cpf_user){
        const stmt = db.prepare(`SELECT * FROM telephone WHERE cpf_user = ? and is_principal = true`)
        return stmt.get(cpf_user)
    }


    insert(cpf_user, number, is_principal) {
        const stmt = db.prepare(`INSERT INTO 
        telephone (number, cpf_user, is_principal)
        VALUES (?, ?, ?)`)

        return stmt.run(number, cpf_user, is_principal)
    }

    update(cpf_user, number, is_principal){
        const stmt = db.prepare(`UPDATE telephone SET number = ?, is_principal = ? WHERE cpf_user = ?`)
        return stmt.run(number, is_principal, cpf_user)
    }

    delete(id){
        const stmt = db.prepare(`DELETE FROM telephone WHERE id = ?`)
        return stmt.run(id)
    }

    deleteByUser(cpf_user){
        const stmt = db.prepare(`DELETE FROM telephone WHERE cpf_user = ?`)
        return stmt.run(cpf_user)
    }
}

export {
    TelephoneDao
}