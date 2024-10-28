
import { TelephoneDAO } from "../models/telephone-dao.js"
import { UserDAO } from "../models/user-dao.js"
import { User } from "../models/user-model.js"
import { paginate } from "../utils/paginate.js"
import { EmailDAO } from "../models/email-dao.js"
import { Telephone } from "../models/telephone-model.js"
import { Email } from "../models/email-model.js"

function listaUsers(req, res) {
    const userDao = new UserDAO()
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()
    const usersRaw = userDao.getAll()
    const pageNumber = 1
    let users = []
    for (let user of usersRaw) {

        let returnUser = User.instanceRow(user)
        //adicionando telefone principal
        const telephone = telephoneDao.getTelephonePrincipal(user.id)
        if (telephone) returnUser.telephonePrincipal = telephone.number

        //adicionando email principal
        const email = emailDao.getEmailPrincipal(user.cpf)
        if (email) returnUser.emailPrincipal = email.email

        users.push(returnUser)
    }

    let paged = paginate(users, pageNumber)
    const data = {
        title: 'Lista de Usuários',
        paged
    }
    return res.render('users-listagem', { data })
}

function paginaAddUser(req, res) {
    const data = {
        title: "WEB II - Add User",
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
            title: "WEB II - Add User",
            errorMessage: "CPF já cadastrado!"
        }
        return res.render('users-formulario', { data })
    }

    // seta campo admin no formato esperado pelo banco 
    if (body.isAdmin) body.isAdmin = 'true'
    else body.isAdmin = 'false'

    let telephones = Telephone.instanceList(body.telephones, body.telefonePrincipal)
    let emails = Email.instanceList(body.emails, body.emailPrincipal)
    const user = new User({name: body.name, cpf: body.cpf, password: body.password, isAdmin: body.isAdmin, telephones, emails})
    // Verificação telefone e email
    let verifyPhone = user.verifyIfMainPhoneExists()
    if (!verifyPhone.exists) return res.render("users-formulario", { data: { errorMessage: verifyPhone.message,  title: "WEB II - Add User"} })
    let verifyMail = user.verifyIfMainEmailExists()
    if (!verifyMail.exists) return res.render("users-formulario", { data: { errorMessage: verifyMail.message,  title: "WEB II - Add User"} })

    let newUser = userDao.insert(user)
    newUser = userDao.getById(newUser.lastInsertRowid)
    Telephone.insertList(telephones, newUser.id)
    Email.insertList(emails, newUser.id)

    res.redirect("/users");
}



function deleteUser(req, res) {
    const userDao = new UserDAO()
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()

    try {
        const id = req.params.id

        //Verifica se o usuario é admin
        const user = userDao.getById(id)
        if (user.isAdmin == 'true') {
            return res.status(403).send('Usuário admin não pode ser removido')
        }
        telephoneDao.deleteTelephonesByIdUser(id)
        emailDao.deleteEmailsByIdUser(id)
        userDao.delete(id)
        res.sendStatus(200)
    }

    catch (error) {
        console.error("Erro ao tentar remover o usuário:", error);
        res.status(500).send("Erro ao tentar remover o usuário.");
    }
}

function updateUser(req, res) {
    const userDao = new UserDAO()
    const { name, password, createdAt, udpatedAt } = req.body
    const { id } = req.params
    const user = new User(name, null, password, null, createdAt, udpatedAt, id)

    try {
        let verifyPhone = user.verifyIfMainPhoneExists()
        if (!verifyPhone.exists) return res.render("user-atualiza", { message: verifyPhone.message })
        let verifyMail = user.verifyIfMainEmailExists()
        if (!verifyMail.exists) return res.render("user-atualiza", { message: verifyMail.message })

        userDao.update(user)
        user.updateTelephones()
        user.updateEmail()
        
    }catch {
        console.error("Erro ao tentar atualizar o usuário:", error);
        res.status(500).send("Erro ao tentar atualizar o usuário.");

    }
}

function userById(req, res){
    const userDao = new UserDAO()
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()
    const id = req.params.id
    const user = userDao.getById(id)
    
    //adicionando lista de telefones
    const telephenes = telephoneDao.getTelephonesByIdUser(user.id)
    user.telephenes = telephenes

    //adicionando lista emails
    const emails = emailDao.getEmailsByIdUser(user.id)
    user.emails = emails

    res.render('users-detalhes', { user })
}

export {
    addUser,  
    listaUsers,
    paginaAddUser,
    deleteUser,
    userById,
    updateUser
}
