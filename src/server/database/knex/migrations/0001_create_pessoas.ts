import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";


export async function up(knex: Knex){
    return knex.schema.createTable(ETableNames.pessoas, table => {
      table.bigIncrements('id').primary();
      table.string('nome',150).index().notNullable();
      table.string('sobrenome',150).index().notNullable();
      table.string('email',150).unique().notNullable();
      table.string('sexo',15).notNullable();
      table.string('patrimonio',150).notNullable();
      table.integer('idade',3).notNullable();
      table.string('habilidades',255).notNullable();
      table.string('profissao',150).notNullable();
      table.boolean('deficiente').notNullable();
      table.integer('numeroSapato').notNullable();
      table.date('dataNascimento').notNullable();
      table.dateTime('dataHoraCad').notNullable();
      table.time('horaEvento').notNullable();
      table.bigInteger('cidadeId').unsigned().notNullable();
      table.foreign('cidadeId')
      .references('id').inTable(ETableNames.cidades)
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

