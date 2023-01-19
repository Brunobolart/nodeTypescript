import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export const Create = async (cidades: Omit<ICidades, 'id'>): Promise<number | Error> => {
     try {
         const [result] = await Knex(ETableNames.cidades).insert(cidades).returning('id');
         
         if(typeof result === 'object'){
            return result.id;
         }else if(typeof result === 'number'){
            return result;
         }

         return new Error(`Erro ao criar o registro ${ETableNames.cidades}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao criar o registro P${ETableNames.cidades}`);
     }
    
}