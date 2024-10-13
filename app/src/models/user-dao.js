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
    list() {
        const stmt = db.prepare('SELECT * FROM users');
        const users = stmt.all();
        console.log({ users })

        return users;
    }

    save({ cpf, name, email, password, isAdmin, createdAt, updatedAt }) {
        const stmt = db.prepare('INSERT INTO users (cpf, name, email, password, isAdmin, created_at, updated_at) VALUES (@name, @email, @password, @createdAt)');
        stmt.run({ cpf, name, email, password, idAdmin, createdAt, updatedAt });
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