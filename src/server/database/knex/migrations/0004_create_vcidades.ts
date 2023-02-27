import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";
import { ICidades, IPessoas } from "../../models";

let cidades: ICidades;
let pessoas: IPessoas;
let view: any;

export async function up(knex: Knex){
    view = knex.select('cidades.id', 'cidades.cidade', 'cidades.uf',
        'pessoas.id as pessoasId', 'pessoas.nome', 'pessoas.sobrenome',
        'pessoas.cidadeId','pessoas.email').from(ETableNames.cidades)
    .join(ETableNames.pessoas,function(){
       this.on('cidades.id','=','pessoas.cidadeId')
    });

    console.log(`# Created View ${ETableNames.vcidades}`);
    return knex.schema.raw('CREATE OR REPLACE VIEW '+ETableNames.vcidades+' AS (\n' + view + '\n)')
}


export async function down(knex: Knex){
    knex.schema.dropView(ETableNames.vcidades).then(() => {
        console.log(`# Droped table ${ETableNames.audity}`);
    });
}

