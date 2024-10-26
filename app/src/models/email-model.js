class Email {
    constructor(id, email, idUser) {
        this.id = id;
        this.email = email;
        this.id_user = id_user;
    }

    // static instanceRow(row) {
    //     return new Email(row.id, row.email, row.id_user);
    // }
}

export {
    Email
}