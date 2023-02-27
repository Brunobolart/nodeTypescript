import { Knex } from "knex";

import { ETableNames } from "../../ETableNames";

export const seed = async (knex: Knex) => {

    const [{ count }] = await knex(ETableNames.usuarios).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;



   


        
        const LUsuarios = [{
          usuarios: [
            {
              "nome":"Bruno Barros",
              "email":"bruno@gmail.com",
               "senha":"123456"
             },
             {
              "nome":"Paulo Barros",
              "email":"paulo@gmail.com",
               "senha":"123456"
             },
             {
              "nome":"Lidia Barros",
              "email":"lidia@gmail.com",
               "senha":"123456"
             },
             {
              "nome":"Filipe Barros",
              "email":"filipe@gmail.com",
               "senha":"123456"
             },
             {
              "nome":"Fernanda Barros",
              "email":"nanda@gmail.com",
               "senha":"123456"
             }
        ]
        }];

      const usuariosSystem = LUsuarios[0].usuarios.map( users => ({ nome: users.nome, email: users.email, senha: users.senha }));

    await knex(ETableNames.usuarios).insert(usuariosSystem);
    

};




