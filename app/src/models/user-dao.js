// DAO DATA ACCESS OBJECT

// DAO X REPOSITORY
/*

    DAO => RELACIONADO DIRETAMENTE AO BANCO DE DADOS** DA TUA APLICAÇÃO
        LIST USER

    REPOSITORY => RELACIONA OS DADOS COM REGRAS NEGOCIO
        LIST ACTIVE USERS

    PARA MAIORIA DOS CASOS, EXEMPLOS, AULAS, PROJETOS REAIS
        ELES REPRESENTAM A MESMA


    ** PERSISTENCIA DE DADOS


    SERVICE VS REPOSITORY
        SERVICE SE COMPORTA DE MANEIRA PARECIDA COM A DO CONTROLLER EM UM MVC
        O REPOSITORY ELE MISTURA O ACESSO A INFORMAÇÃO (BANCO DE DADOS) COM FILTROS, REGRAS, ETC

*/


import { db } from "../config/database.js";
import { User } from "./user-model.js";

class UserDao {
    buscaTodos(){
        const stmt = this.db.prepare('SELECT * FROM usuario')
        return stmt.all()
    }

    buscaPorId(id){
        console.log(id)
        const stmt = this.db.prepare(`SELECT * FROM usuario WHERE id = ?`)
        return stmt.get(id)
    }

    inserir(usuario){
        const stmt = this.db.prepare(` INSERT INTO 
        usuario (nome, cpf, tipo) 
        VALUES (?, ?, ?)`)
        return stmt.run(usuario.nome, usuario.cpf, usuario.tipo)
    }

    atualizar(usuario){
        const stmt = this.db.prepare(`UPDATE usuario SET nome = ?, cpf = ?, tipo = ? WHERE id = ?`)
        return stmt.run(usuario.nome, usuario.cpf, usuario.tipo, usuario.id)
    }

    deletar(id){
        const stmt = this.db.prepare(`DELETE FROM usuario WHERE id = ?`)
        return stmt.run(id)
    }

    delete(cpf) {
        const stmt = db.prepare('DELETE FROM users WHERE cpf = ?');
        const result = stmt.run(cpf);

        return result;
    }
}

export {
    UserDao
}