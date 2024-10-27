import { EmailDAO } from "./email-dao"
import { Email } from "./email-model"
import { TelephoneDAO } from "./telephone-dao"
import { Telephone } from "./telephone-model"

class User {
    constructor(name, cpf, password, isAdmin, createdAt, updatedAt, id = null, mainPhone = null, mainEmail = null, telephones = null, emails = null) {
        this.name = name
        this.cpf = cpf
        this.password = password
        this.isAdmin = isAdmin
        this.createdAt = createdAt ?? Date.now()
        this.updatedAt = updatedAt ?? Date.now()
        this.id = id
        this.mainPhone= mainPhone
        this.mainEmail = mainEmail
        this.telephones = telephones
        this.emails = emails
    }

    static instanceRow(user) {
        return new User(user.name, user.cpf, user.password, user.is_admin, user.created_at, user.updatedAt, user.id)
    }

    verifyIfMainPhoneExists() {
        let mainCount = 0
        for (let phone of this.telephones) if (phone.isPrincipal == 1) mainCount++
        if (mainCount > 1) return { message: 'Só é possível ter um Telefone principal', exists: false }
        else if (mainCount == 0 && this.telephones.length > 0) return { message: 'É necessário ao menos um Telefone principal', exists: false }
        return { message: null, exists: true }
    }
    verifyIfMainEmailExists() {
        let mainCount = 0
        for (let mail of this.emails) if (mail.isPrincipal == 1) mainCount++
        if (mainCount > 1) return { message: 'Só é possível ter um Email principal', exists: false }
        else if (mainCount == 0 && this.emails.length > 0) return { message: 'É necessário ao menos um Email principal', exists: false }
        return { message: null, exists: true }
    }

    updateTelephones(){
        let telephoneDAO = new TelephoneDAO()
        let oldTelephone = telephoneDAO.findByUserId(this.id)

        let telephoneInsert = this.telephones.filter((telephone) => { if(oldTelephone.findIndex((oldTelephone) => oldTelephone.id == telephone.id) == -1) return telephone })
        let telephoneDelete = oldTelephone.filter((oldTelephone) => { if(this.telephones.findIndex((telephone) => oldTelephone.id == telephone.id) == -1) return oldTelephone })
        let telephoneUpdate = this.telephones.filter((telephone) => { if(oldTelephone.findIndex((oldTelephone) => oldTelephone.id == telephone.id) != -1) return telephone })

        Telephone.insertList(telephoneInsert, this.id)

        Telephone.deleteList(telephoneDelete)

        Telephone.updateList(telephoneUpdate)

    }
    updateEmail(){
        let emailDAO = new EmailDAO()
        let oldEmail = emailDAO.findByUserId(this.id)

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