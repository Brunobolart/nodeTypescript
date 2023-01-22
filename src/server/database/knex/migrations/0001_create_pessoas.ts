import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";


export async function up(knex: Knex){
    return knex.schema.createTable(ETableNames.pessoas, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome',150).index().notNullable();
      table.string('sobrenome',150).index().notNullable();
      table.string('email',150).unique().notNullable();
      table.bigInteger('cidadeId').index().notNullable()
      .references('id')
      .inTable(ETableNames.cidades)
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      
      table.comment(`Tabela para armazenamento de ${ETableNames.pessoas}`);
    }).then(() => {
        console.log(`# Created table ${ETableNames.pessoas}`);
    });
}


export async function down(knex: Knex){
    knex.schema.dropTable(ETableNames.pessoas).then(() => {
        console.log(`# Droped table ${ETableNames.pessoas}`);
    });
}

