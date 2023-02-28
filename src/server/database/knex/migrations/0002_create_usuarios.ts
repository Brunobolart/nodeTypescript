import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";


export async function up(knex: Knex){
    return knex.schema.createTable(ETableNames.usuarios, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome').notNullable().checkLength('>',3);
      table.string('email').index().unique().notNullable();
      table.string('senha').notNullable().checkLength('>',5);
      table.datetime('data_cad').notNullable().defaultTo(knex.fn.now());
      table.string('permissao').notNullable().defaultTo('usuario');
      
      table.comment(`Tabela para armazenamento de ${ETableNames.usuarios}`);
    }).then(() => {
        console.log(`# Created table ${ETableNames.usuarios}`);
    });
}


export async function down(knex: Knex){
    knex.schema.dropTable(ETableNames.usuarios).then(() => {
        console.log(`# Droped table ${ETableNames.usuarios}`);
    });
}

