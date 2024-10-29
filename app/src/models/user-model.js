import { EmailDAO } from "./email-dao.js"
import { Email } from "./email-model.js"
import { TelephoneDAO } from "./telephone-dao.js"
import { Telephone } from "./telephone-model.js"

class User {
    constructor(user) {
        this.name = user.name
        this.cpf = user.cpf
        this.password = user.password
        this.isAdmin = user.isAdmin
        this.createdAt = user.createdAt ?? Date.now()
        this.updatedAt = user.updatedAt ?? Date.now()
        this.id = user.id
        this.mainPhone = user.mainPhone
        this.mainEmail = user.mainEmail
        this.telephones = user.telephones
        this.emails = user.emails
    }

    static instanceRow(user) {
        return new User({name: user.name, cpf: user.cpf, password: user.password, isAdmin: user.is_admin, createdAt: user.created_at, updatedAt: user.updatedAt, id: user.id})
    }

    verifyIfMainPhoneExists() {
        let mainCount = 0
        for (let phone of this.telephones) if (phone.isPrincipal == 'true') mainCount++
        if (mainCount > 1) return { message: 'Só é possível ter um Telefone principal', exists: false }
        else if (mainCount == 0 && this.telephones.length > 0) return { message: 'É necessário ao menos um Telefone principal', exists: false }
        return { message: null, exists: true }
    }
    verifyIfMainEmailExists() {
        let mainCount = 0
        for (let mail of this.emails) if (mail.isPrincipal == 'true') mainCount++
        if (mainCount > 1) return { message: 'Só é possível ter um Email principal', exists: false }
        else if (mainCount == 0 && this.emails.length > 0) return { message: 'É necessário ao menos um Email principal', exists: false }
        return { message: null, exists: true }
    }

    updateTelephones(){
        let telephoneDAO = new TelephoneDAO()
        let oldTelephone = telephoneDAO.getTelephonesByIdUser(this.id)

        let telephoneInsert = this.telephones.filter((telephone) => { if(oldTelephone.findIndex((oldTelephone) => oldTelephone.id == telephone.id) == -1) return telephone })
        let telephoneDelete = oldTelephone.filter((oldTelephone) => { if(this.telephones.findIndex((telephone) => oldTelephone.id == telephone.id) == -1) return oldTelephone })
        let telephoneUpdate = this.telephones.filter((telephone) => { if(oldTelephone.findIndex((oldTelephone) => oldTelephone.id == telephone.id) != -1) return telephone })

        Telephone.insertList(telephoneInsert, this.id)

        Telephone.deleteList(telephoneDelete)

        Telephone.updateList(telephoneUpdate)

    }
    updateEmail(){
        let emailDAO = new EmailDAO()
        let oldEmail = emailDAO.getEmailsByIdUser(this.id)

        let emailInsert = this.emails.filter((email) => { if(oldEmail.findIndex((oldEmail) => oldEmail.id == email.id) == -1) return email })
        let emailDelete = oldEmail.filter((oldEmail) => { if(this.emails.findIndex((email) => oldEmail.id == email.id) == -1) return oldEmail })
        let emailUpdate = this.emails.filter((email) => { if(oldEmail.findIndex((oldEmail) => oldEmail.id == email.id) != -1) return email })

        Email.insertList(emailInsert, this.id)

        Email.deleteList(emailDelete)

        Email.updateList(emailUpdate)

    }



}



export {
    User
}