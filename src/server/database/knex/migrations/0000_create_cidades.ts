import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";


export async function up(knex: Knex){
    return knex.schema.createTable(ETableNames.cidades, table => {
      table.bigIncrements('id').primary().index();
      table.string('cidade',150).index().notNullable();
      table.string('uf',2).index().notNullable();
      
      table.comment('Tabela para armazenamento de cidades');
    }).then(() => {
        console.log(`# Created table ${ETableNames.cidades}`);
    });
}


export async function down(knex: Knex){
    knex.schema.dropTable(ETableNames.cidades).then(() => {
        console.log(`# Droped table ${ETableNames.cidades}`);
    });
}

