import { knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { IPessoas } from "../../database/models";
import { LocalStorage } from "node-localstorage";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import mysql from 'mysql'

import { development, production, test } from './Environment';


let dia: string;
let mes: string;
let ano: string;
let hora: string;

mysql.Types.SET

const getEnvironment = () => {
  
  switch (process.env.NODE_ENV) {
    case 'production': console.log('produção'); return production;
    case 'test': console.log('test'); return test;

    default: console.log('default'); return development;
  }
};

const Knex_audit = knex(getEnvironment());


const createAudity = async (query: string): Promise<number | Error> => {
  try {
    const localStorage = new LocalStorage('./scratch');
    
    dia = new Date().toLocaleString("pt-BR", { day: "2-digit" });
    mes = new Date().toLocaleString("pt-BR", { month: "2-digit" });
    ano = new Date().getFullYear().toString();
    hora = new Date().toLocaleTimeString("pt-BR");

    const [result] = await Knex_audit(ETableNames.audity).insert({
      action: query,
      dataHora: ano+'-'+mes+'-'+dia+' '+hora,
      usuarioId: Number(localStorage.getItem('userId'))
    }).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error(`Erro ao auditar tdoos os registros ${ETableNames.audity}`);

  } catch (error) {
    console.log(error);
    return new Error(`Erro ao auditar todos os registros ${ETableNames.audity}`);
  }

}


export const Knex = knex(getEnvironment()).on('start', (builder) => {

  createAudity(builder.toQuery())

});






