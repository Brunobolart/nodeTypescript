import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export const Count = async (filter = ''): Promise<number | Error> => {
     try {
         const [{ count }] = await Knex(ETableNames.cidades)
          .where('cidade','like',`%${filter}%`)
          .count<[{count: number}]>('* as count');
         
         if(Number.isInteger(Number(count))) return Number(count);
         
         return new Error(`Erro ao consultar o total de registros de(a/as) ${ETableNames.cidades}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao consultar o total de registros de(a/as) ${ETableNames.cidades}`);
     }
    
}