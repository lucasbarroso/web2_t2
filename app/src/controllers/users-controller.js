import { UserDao } from "../models/user-dao.js";
import { User } from "../models/user-model.js";

function listaUsers(req, res) {
    const userDao = new UserDao();
    const usersRaw = userDao.list();

    for(let user of usersRaw){
        //adicionando telefone principal
        const telefone = userDao.get
        if(telefone) usuario.telefonePrincipal = telefone.numero

        //adicionando email principal
        const email = this.emailRepository.buscarEmailPrincipal(usuario.id)
        if(email) usuario.emailPrincipal = email.email
    }
    //res.render('usuario', { usuarios })
    //res.json(usuarios)

    const data = {
        title: "WEB II",
        users
    }
    res.render('users-listagem', { data });
    // o return é opcional aqui, cuidado para nao dar dois renders ao mesmo tempo
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
    console.log({ rota: "/users/add", data: req.body })
    const userDao = new UserDao();

    // const { name, email, password } = req.body;
    // userDao.save({
    //     name, email, password
    // })

    const dados = req.body;
    const newUser = new User(dados.name, dados.email, dados.password);
    userDao.save(newUser);

    res.redirect("/users");
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
