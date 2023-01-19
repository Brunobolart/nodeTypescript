import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export const GetById = async (id: number): Promise<ICidades | Error> => {
     try {
         const result = await Knex(ETableNames.cidades).select('*').where('id','=',id).first();
         
         if(result) return result;
         
         return new Error(`Erro ao buscar o registro ${ETableNames.cidades} pelo ID`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao buscar o registro ${ETableNames.cidades} pelo ID`);
     }
    
}