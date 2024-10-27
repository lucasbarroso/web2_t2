import { TelephoneDAO } from "./telephone-dao"

class Telephone {
    constructor(number, isPrincipal, id_user) {
        this.number = number
        this.isPrincipal = isPrincipal
        this.id_user = id_user
    }



    static insertList(telephones, id_user) {
        let telephoneDAO = new TelephoneDAO()
        for (let telephone of telephones) {
            const phone = new Telephone(null, telephone.number, telephone.isPrincipal)
            telephoneDAO.inserir(id_user, phone)
        }
    }

    static deleteList(telephones) {
        let telephoneDAO = new TelephoneDAO()
        
        for (let telephone of telephones) {
            telephoneDAO.deletar(telephone.id)
        }
    }

    static updateList(telephones) {
        let telephoneDAO = new TelephoneDAO()
        for (let telephone of telephones) {
            let phone = new Telephone(telephone.id, telephone.num, telephone.isPrincipal)
            telephoneDAO.atualizar(phone)
        }
    }
}



export {
    Telephone
}