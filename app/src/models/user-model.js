class User {
    constructor(name, email, password, createdAt, updatedAt) {
        this.name = name
        this.email = email
        this.password = password
        this.createdAt = createdAt ?? Date.now()
        this.updatedAt = updatedAt ?? Date.now()
        
    }
}

export {
    User
}