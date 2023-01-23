import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export const GetByEmail = async (email: string): Promise<IUsuarios | Error> => {
     try {
         const result = await Knex(ETableNames.usuarios).select('*').where('email','=',email).first();
         
         if(result) return result;
         
         return new Error(`Erro ao buscar o registro ${ETableNames.usuarios} pelo email`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao buscar o registro ${ETableNames.usuarios} pelo email`);
     }
    
}