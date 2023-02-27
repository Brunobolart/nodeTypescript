import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export const GetById = async (id: number): Promise<IPessoas | Error> => {
     try {
         const result = await Knex(ETableNames.vpessoas).select('*')
         .where('id','=',id).first();
         
         if(result) return result;
         
         return new Error(`Erro ao buscar o registro ${ETableNames.vpessoas} pelo ID`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao buscar o registro ${ETableNames.vpessoas} pelo ID`);
     }
    
}