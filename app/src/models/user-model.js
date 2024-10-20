class User {
    constructor(name, cpf, password, isAdmin, createdAt, updatedAt) {
        this.name = name
        this.cpf = cpf
        this.password = password
        this.isAdmin = isAdmin
        this.createdAt = createdAt ?? Date.now()
        this.updatedAt = updatedAt ?? Date.now()

    }

    static instanceRow(user){
        return new User(user.name, user.cpf, user.password, user.is_admin, user.created_at, user.updatedAt)
    }
}


export {
    User
}