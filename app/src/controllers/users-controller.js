import { EmailDao } from "../models/email-dao.js"
import { TelephoneDao } from "../models/telephone-dao.js"
import { UserDao } from "../models/user-dao.js"
import { User } from "../models/user-model.js"
import { inspect } from 'util'

function listaUsers(req, res) {
    const userDao = new UserDao()
    const telephoneDao = new TelephoneDao()
    const emailDao = new EmailDao()
    const usersRaw = userDao.getAll()
    let users = []
    for(let user of usersRaw){

        let returnUser = User.instanceRow(user)
        //adicionando telefone principal
        const telephone = telephoneDao.getTelephonePrincipal(user.cpf)
        if(telephone) returnUser.telephonePrincipal = telephone.number

        //adicionando email principal
        const email = emailDao.getEmailPrincipal(user.cpf)
        if(email) returnUser.emailPrincipal = email.email
        console.log('user ' + inspect(user))
        

        users.push(returnUser)
    }

    const data = {
        title: 'Lista de Usuários',
        users
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
    const userDao = new UserDao()
    const body = req.body
    // verifica se cpf ja está cadastrado
    let hasUser = userDao.getByCpf(body.cpf)
    if(hasUser) {
        const data = {
            title: "WEB II - Add User",
            errorMessage: "CPF já cadastrado!"
        }        
        return res.render('users-formulario', { data })
    }
    
    // seta campo admin no formato esperado pelo banco 
    if(body.isAdmin) body.isAdmin = 'true'
    else body.isAdmin = 'false'

    const newUser = new User(body.name, body.cpf, body.password, body.isAdmin)
    userDao.insert(newUser)

    res.redirect("/users");
}

function deleteUser(req, res) {//falta testar, porém ainda precisa da atualização do banco/model para testes
    const { cpf } = req.params;  
    const userDao = new UserDao();

    try {
        userDao.delete(cpf);  
        res.redirect("/users");  
    } catch (error) {
        console.error("Erro ao tentar remover o usuário:", error);
        res.status(500).send("Erro ao tentar remover o usuário.");
    }
}

export {
    addUser,        // O cpf tem que  ser unico + o perfil (ADMIN/CLIENTE) já é setado na etapa inicial
    listaUsers,     // paginacao (a cada 5) e filtro (pelo nome)
    paginaAddUser,
    // detalhes de usuario  (ver todos os dados de usuario + telefones, emails)
    // exclusao de usuario  (NAO POSSO REMOVER ADMINS)
    // update de usuario (EXCETO PERFIL (admin/cliente) e CPF, todos os outros dados do usuario, telefones e emails podem ser atualizados inclusive setando qual o email/telefone principal)

    // usuario tem que ter multiplos telefones (apenas 1 principal) 1:m
    // usuario tem que ter multiplos emails (apenas 1 principal)    1:m

    // INDIVIDUAL ou DUPLA E VCS TEM DUAS SEMANAS =)
};
