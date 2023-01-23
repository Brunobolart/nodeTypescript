import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export const Create = async (usuarios: Omit<IUsuarios, 'id'>): Promise<number | Error> => {
     try {
         const [result] = await Knex(ETableNames.usuarios).insert(usuarios).returning('id');
         
         if(typeof result === 'object'){
            return result.id;
         }else if(typeof result === 'number'){
            return result;
         }

         return new Error(`Erro ao criar o registro ${ETableNames.usuarios}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao criar o registro P${ETableNames.usuarios}`);
     }
    
}