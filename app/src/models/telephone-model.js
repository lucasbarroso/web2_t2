import { TelephoneDAO } from "./telephone-dao.js"

class Telephone {
    constructor(id, number, isPrincipal, id_user = null) {
        this.number = number
        this.isPrincipal = isPrincipal
        this.id_user = id_user
        this.id = id
    }

    static instanceList(telephenes, principal){
        let phoneObjects = []
        for(let i = 0; i < telephenes.length; i++){
            if(i == principal - 1) phoneObjects.push(new Telephone(null, telephenes[i], 'true'))
            else phoneObjects.push(new Telephone(null, telephenes[i], 'false'))
        }
        return phoneObjects
    }

    static insertList(telephones, id_user) {
        let telephoneDAO = new TelephoneDAO()
        for (let telephone of telephones) {
            const phone = new Telephone(null, telephone.number, telephone.isPrincipal, id_user)
            telephoneDAO.createTelephone(phone)
        }
    }

    static deleteList(telephones) {
        let telephoneDAO = new TelephoneDAO()
        
        for (let telephone of telephones) {
            telephoneDAO.delete(telephone.id)
        }
    }

    static updateList(telephones) {
        let telephoneDAO = new TelephoneDAO()
        for (let telephone of telephones) {
            let phone = new Telephone(telephone.id, telephone.number, telephone.isPrincipal)
            telephoneDAO.update(phone)
        }
    }
}



export {
    Telephone
}