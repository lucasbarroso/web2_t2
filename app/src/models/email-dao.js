class EmailDao {
    getByUser(cpf_user){
        const stmt = this.db.prepare('SELECT * FROM email WHERE cpf_user = ?')
        return stmt.all(cpf_user)
    }

    getEmailPrincipal(cpf_user){
        const stmt = this.db.prepare(`SELECT * FROM email WHERE cpf_user = ? and is_principal = true`)
        return stmt.get(cpf_user)
    }

    insert(cpf_user, email, is_principal) {
        const stmt = this.db.prepare(`INSERT INTO 
        email (email, cpf_user, is_principal)
        VALUES (?, ?, ?)`)

        return stmt.run(email, cpf_user, is_principal)
    }

    update(email){
        const stmt = this.db.prepare(`UPDATE email SET email = ?, is_principal = ? WHERE email = ?`)
        return stmt.run(email.email, email.ehPrincipal, email.email)
    }

    delete(id){
        const stmt = this.db.prepare(`DELETE FROM email WHERE id = ?`)
        return stmt.run(id)
    }

    deleteByUser(cpf_user){
        const stmt = this.db.prepare(`DELETE FROM email WHERE id_usuario = ?`)
        return stmt.run(cpf_user)
    }
}

export { EmailDao }