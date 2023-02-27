import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export const GetAll = async (page: number, limit: number, filter: string, id: number): Promise<IUsuarios[] | Error> => {
     try {
         const result = await Knex(ETableNames.usuarios)
         .select('*')
        // .where('id', '=', Number(id))
         .where('nome','like',`%${filter}%`)
         .offset((page - 1) * limit)
         .limit(limit);
         
         if(id > 0 && result.every(item => item.id !== id)){
            const resultById = await Knex(ETableNames.usuarios)
            .select('*')
            .where('id','=',id)
            .first();

            if(resultById) return [...result, resultById];

         }
        
        
         return result;
         
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao buscar todos os registros de(a/as) ${ETableNames.usuarios}`);
     }
    
}