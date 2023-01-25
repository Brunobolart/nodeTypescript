import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";


export async function up(knex: Knex){
    return knex.schema.createTable(ETableNames.auth, table => {
      table.string('accessToken').notNullable().checkLength('>',3);
      
      
      
      table.comment(`Tabela para armazenamento de ${ETableNames.usuarios}`);
    }).then(() => {
        console.log(`# Created table ${ETableNames.auth}`);
    });
}


export async function down(knex: Knex){
    knex.schema.dropTable(ETableNames.usuarios).then(() => {
        console.log(`# Droped table ${ETableNames.usuarios}`);
    });
}

