import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export const GetById = async (id: number): Promise<IUsuarios | Error> => {
     try {
         const result = await Knex(ETableNames.usuarios).select('*')
         .where('id','=',id).first();
         
         if(result) return result;
         
         return new Error(`Erro ao buscar o registro ${ETableNames.usuarios} pelo ID`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao buscar o registro ${ETableNames.usuarios} pelo ID`);
     }
    
}