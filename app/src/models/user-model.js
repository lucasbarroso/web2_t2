class User {
    constructor(id, cpf, name, password, mainPhone, mainEmail, isAdmin, createdAt = Date.now(), updatedAt = Date.now()) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.password = password;
        this.mainPhone = mainPhone;
        this.mainEmail = mainEmail;
        this.isAdmin = isAdmin;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Método para criar uma instância de User a partir de uma linha de resultado do banco de dados
    static fromRow(row) {
        return new User(row.id, row.cpf, row.name, row.password, row.mainPhone, row.mainEmail, row.is_admin, row.created_at, row.updated_at);
    }
}

export {
    User
}