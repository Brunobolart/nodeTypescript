import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export const UpdateById = async (id: number,cidades: Omit<ICidades, 'id'>): Promise<void | Error> => {
     try {
         const result = await Knex(ETableNames.cidades).update(cidades).where('id','=',id);
         
         if(result > 0) return;
         
         return new Error(`Erro ao atualizar o registro ${ETableNames.cidades}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao atualizar o registro ${ETableNames.cidades}`);
     }
    
}