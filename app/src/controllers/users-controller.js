import { TelephoneDAO } from "../models/telephone-dao.js"
import { UserDAO } from "../models/user-dao.js"
import { User } from "../models/user-model.js"
import { paginate } from "../utils/paginate.js"
import { EmailDAO } from "../models/email-dao.js"
import { Telephone } from "../models/telephone-model.js"
import { Email } from "../models/email-model.js"
import { role } from "../config/role.js"

function listaUsers(req, res) {
    let errorMessage = req.query.errorMessage
    const userDao = new UserDAO()
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()
    let usersRaw = userDao.getAll()
    let pageNumber = req.query.pageNumber

    if (!pageNumber) pageNumber = 1

    const search = req.query.search
    if (search) usersRaw = userDao.getByName(search)
    else usersRaw = userDao.getAll()

    let users = []
    if (!Array.isArray(usersRaw)) usersRaw = [usersRaw]
    for (let user of usersRaw) {

        let returnUser = User.instanceRow(user)
        //adicionando telefone principal
        const telephone = telephoneDao.getTelephonePrincipal(user.id)
        if (telephone) returnUser.mainPhone = telephone.number

        //adicionando email principal
        const email = emailDao.getEmailPrincipal(user.id)
        if (email) returnUser.mainEmail = email.email

        if (role.ADMIN[0] == returnUser.isAdmin) returnUser.isAdmin = role.ADMIN[1]
        else returnUser.isAdmin = role.CLIENTE[1]

        users.push(returnUser)
    }

    let paged = paginate(users, pageNumber)
    const data = {
        title: 'Lista de Usuários',
        paged,
        errorMessage
    }
    return res.render('users-listagem', { data })
}

function paginaAddUser(req, res) {
    const data = {
        title: "Adiciona Usuário",
    }
    res.render('users-formulario', { data });
}
function addUser(req, res) {
    const userDao = new UserDAO()
    const body = req.body
    // verifica se cpf ja está cadastrado
    let hasUser = userDao.getByCpf(body.cpf)
    if (hasUser) {
        const data = {
            title: "Adiciona Usuário",
            errorMessage: "CPF já cadastrado!"
        }
        return res.render('users-formulario', { data })
    }

    // seta campo admin no formato esperado pelo banco 
    if (body.isAdmin) body.isAdmin = 'true'
    else body.isAdmin = 'false'

    let telephones = Telephone.instanceList(body.telephones, body.telefonePrincipal)
    let emails = Email.instanceList(body.emails, body.emailPrincipal)
    const user = new User({ name: body.name, cpf: body.cpf, password: body.password, isAdmin: body.isAdmin, telephones, emails })
    // Verificação telefone e email
    let verifyPhone = user.verifyIfMainPhoneExists()
    if (!verifyPhone.exists) return res.render("users-formulario", { data: { errorMessage: verifyPhone.message, title: "WEB II - Add User" } })
    let verifyMail = user.verifyIfMainEmailExists()
    if (!verifyMail.exists) return res.render("users-formulario", { data: { errorMessage: verifyMail.message, title: "WEB II - Add User" } })

    let newUser = userDao.insert(user)
    newUser = userDao.getById(newUser.lastInsertRowid)
    Telephone.insertList(telephones, newUser.id)
    Email.insertList(emails, newUser.id)

    res.redirect("/users")
}



function deleteUser(req, res) {
    const userDao = new UserDAO()
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()


    const id = req.params.id

    //Verifica se o usuario é admin
    let user = userDao.getById(id)
    user = User.instanceRow(user)
    
    if (user.isAdmin == role.ADMIN[0]) {
        let errorMessage = 'Usuário admin não pode ser removido'
        return res.redirect(`/users?errorMessage=${errorMessage}`)
    }
    telephoneDao.deleteTelephonesByIdUser(id)
    emailDao.deleteEmailsByIdUser(id)
    userDao.delete(id)
    res.redirect("/users")
}

function paginaUpdateUser(req, res) {
    const userDao = new UserDAO()
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()
    const errorMessage = req.query.message
    const id = req.params.id

    let user = userDao.getById(id)
    user = User.instanceRow(user)

    const telephones = telephoneDao.getTelephonesByIdUser(user.id)
    user.telephones = telephones

    const emails = emailDao.getEmailsByIdUser(user.id)
    user.emails = emails

    const data = {
        title: "Atualiza Usuário",
        user,
        errorMessage
    }
    
    res.render('users-atualiza', { data });
}

function updateUser(req, res) {
    const userDao = new UserDAO()
    const { id, name, password, telephones, telefonePrincipal, emails, emailPrincipal } = req.body

    let newTelephones = Telephone.instanceList(telephones, telefonePrincipal)
    let newEmails = Email.instanceList(emails, emailPrincipal)
    const user = new User({ id, name, password, telephones: newTelephones, emails: newEmails })
    let verifyPhone = user.verifyIfMainPhoneExists()
    if (!verifyPhone.exists) return res.redirect(`/users/updateUser/${id}?message=${verifyPhone.message}`)
    let verifyMail = user.verifyIfMainEmailExists()
    if (!verifyMail.exists) return res.redirect(`/users/updateUser/${id}?message=${verifyPhone.message}`)

    userDao.update(user)
    user.updateTelephones()
    user.updateEmail()

    res.redirect("/users")
}

function userById(req, res) {
    const userDao = new UserDAO()
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()
    const id = req.params.id
    let user = userDao.getById(id)
    user = User.instanceRow(user)

    //adicionando lista de telefones
    const telephones = telephoneDao.getTelephonesByIdUser(user.id)
    for (let telephone of telephones) {
        if (telephone.is_principal == 'true') telephone.is_principal = 'Sim.'
        else telephone.is_principal = 'Não.'
    }
    user.telephones = telephones

    //adicionando lista emails
    const emails = emailDao.getEmailsByIdUser(user.id)
    for (let email of emails) {
        if (email.is_principal == 'true') email.is_principal = 'Sim.'
        else email.is_principal = 'Não.'
    }
    user.emails = emails
    if (role.ADMIN[0] == user.isAdmin) user.isAdmin = role.ADMIN[1]
    else user.isAdmin = role.CLIENTE[1]

    res.render('users-detalhes', { user })
}

export {
    addUser,
    listaUsers,
    paginaAddUser,
    deleteUser,
    userById,
    updateUser,
    paginaUpdateUser
}
