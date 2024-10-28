import { EmailDAO } from "./email-dao.js"

class Email {
    constructor(id, email, isPrincipal, id_user) {
        this.email = email
        this.isPrincipal = isPrincipal
        this.id_user = id_user
        this.id = id
    }

    static instanceList(emails, principal){
        let emailObjects = []
        for(let i = 0; i < emails.length; i++){
            if(i == principal - 1) emailObjects.push(new Email(null, emails[i], 'true'))
            else emailObjects.push(new Email(null, emails[i], 'false'))
        }
        return emailObjects
    }

    static insertList(emails, id_user) {
        let emailDAO = new EmailDAO()
        for (let email of emails) {
            const mail = new Email(null, email.email, email.isPrincipal, id_user)
            emailDAO.createEmail(mail)
        }
    }

    static deleteList(emails) {
        let emailDAO = new EmailDAO()

        for (let email of emails) {
            emailDAO.deletar(email.id)
        }
    }

    static updateList(emails) {
        let emailDAO = new EmailDAO()
        for (let email of emails) {
            let mail = new Email(email.id, email.email, email.isPrincipal)
            emailDAO.atualizar(mail)
        }
    }

}

export {
    Email
}