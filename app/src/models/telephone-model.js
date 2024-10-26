class Telephone {
    constructor(id, number, idUser) {
        this.id = id;
        this.number = number;
        this.id_user = id_user;
    }

    // static instanceRow(row) {
    //     return new Telephone(row.id, row.number, row.id_user);
    // }
}


export {
    Telephone
}