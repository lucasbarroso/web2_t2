
import { TelephoneDAO } from "../models/telephone-dao.js"
import { UserDAO } from "../models/user-dao.js"
import { User } from "../models/user-model.js"
import { inspect } from 'util'
import { paginate } from "../utils/paginate.js"
import { EmailDAO } from "../models/email-dao.js"

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
        console.log('user ' + inspect(user))


        users.push(returnUser)
    }

    let paged = paginate(users, pageNumber)
    console.log('paged ' + inspect(paged))
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

// TRATAMENTO DE ERROS
// TRATAMENTO DE INPUT (REQ.BODY TEM QUE SER VALIDO)
// LOGS
// TRATAMENTO DE ERRO COM O BANCO
// AUTENTICACAO
// AUTORIZAÇÃO
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

    const newUser = new User(body.name, body.cpf, body.password, body.isAdmin)
    userDao.insert(newUser)

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
    const telephoneDao = new TelephoneDAO()
    const emailDao = new EmailDAO()
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
        
       


    }

    catch {
        console.error("Erro ao tentar atualizar o usuário:", error);
        res.status(500).send("Erro ao tentar atualizar o usuário.");

    }

}









// atualizar(req, res){
//     const { nome, cpf, tipo, telefones, emails } = req.body
//     const { id } = req.params
//     const usuario = new Usuario(id, nome, cpf, tipo, null, telefones, null, emails)

//     //Verifica se o usuario pode ser atualizado
//     if (usuario.podeAtualizar()) this.usuarioRepository.atualizar(usuario)

//     //Verifica se existe apenas um telefone principal
//     let exiteTelefonePrincipal = usuario.verificaExisteTelefonePrincipal()
//     console.log(inspect(exiteTelefonePrincipal))
//     if (!exiteTelefonePrincipal.existe) return res.status(400).send(exiteTelefonePrincipal.mensagem)

//     //Verifica se existe apenas um email principal
//     let exiteEmailPrincipal = usuario.verificaExisteEmailPrincipal()
//     if (!exiteEmailPrincipal.existe) return res.status(400).send(exiteEmailPrincipal.mensagem)

//     //Atualiza telefone
//     usuario.atualizaTelefones(this.telefoneRepository)

//     //Atualiza email
//     usuario.atualizarEmails(this.emailRepository)

//     res.sendStatus(200)
// }













export {
    addUser,        // O cpf tem que  ser unico + o perfil (ADMIN/CLIENTE) já é setado na etapa inicial
    listaUsers,     // paginacao (a cada 5) e filtro (pelo nome)
    paginaAddUser,
    deleteUser,
    // detalhes de usuario  (ver todos os dados de usuario + telefones, emails)
    // exclusao de usuario  (NAO POSSO REMOVER ADMINS)
    // update de usuario (EXCETO PERFIL (admin/cliente) e CPF, todos os outros dados do usuario, telefones e emails podem ser atualizados inclusive setando qual o email/telefone principal)

    // usuario tem que ter multiplos telefones (apenas 1 principal) 1:m
    // usuario tem que ter multiplos emails (apenas 1 principal)    1:m

    // INDIVIDUAL ou DUPLA E VCS TEM DUAS SEMANAS =)
};
