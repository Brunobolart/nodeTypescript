import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export const UpdateById = async (id: number,pessoas: Omit<IPessoas, 'id'>): Promise<void | Error> => {
     try {
         const result = await Knex(ETableNames.pessoas).update(pessoas).where('id','=',id);
         
         if(result > 0) return;
         
         return new Error(`Erro ao atualizar o registro ${ETableNames.pessoas}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao atualizar o registro ${ETableNames.pessoas}`);
     }
    
}