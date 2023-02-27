import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";


export async function up(knex: Knex){
    return knex.schema.createTable(ETableNames.audity, table => {
      table.bigIncrements('id').primary().index();
      table.string('action',700).notNullable();
      table.dateTime('dataHora').notNullable();
      table.bigInteger('usuarioId').unsigned().notNullable();
      table.foreign('usuarioId')
      .references('id')
      .inTable(ETableNames.usuarios);
      
      table.comment(`Tabela para armazenamento de ${ETableNames.audity}`);
    }).then(() => {
        console.log(`# Created table ${ETableNames.audity}`);
    });
}


export async function down(knex: Knex){
    knex.schema.dropTable(ETableNames.audity).then(() => {
        console.log(`# Droped table ${ETableNames.audity}`);
    });
}

