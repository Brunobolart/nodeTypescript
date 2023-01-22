import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export const Create = async (pessoas: Omit<IPessoas, 'id'>): Promise<number | Error> => {
     try {
         const [result] = await Knex(ETableNames.pessoas).insert(pessoas).returning('id');
         
         if(typeof result === 'object'){
            return result.id;
         }else if(typeof result === 'number'){
            return result;
         }

         return new Error(`Erro ao criar o registro ${ETableNames.pessoas}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao criar o registro P${ETableNames.pessoas}`);
     }
    
}