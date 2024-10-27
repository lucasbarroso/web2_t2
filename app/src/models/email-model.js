import { EmailDAO } from "./email-dao"

class Email {
    constructor(email, is_principal, id_user) {
        this.email = email
        this.is_principal = is_principal
        this.id_user = id_user
    }

    static insertList(emails, id_user) {
        let emailDAO = new EmailDAO()
        for (let email of emails) {
            const mail = new Email(null, email.number, email.isPrincipal)
            emailDAO.inserir(id_user, mail)
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
            let mail = new Email(email.id, email.num, email.isPrincipal)
            emailDAO.atualizar(mail)
        }
    }

}

export {
    Email
}