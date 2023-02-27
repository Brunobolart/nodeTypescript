import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const DeleteById = async (id: number): Promise<void | Error> => {
     try {
         const result = await Knex(ETableNames.usuarios).where('id','=',id).del();
         
         if(result > 0) return ;
         
         return new Error(`Erro ao deletar o registro ${ETableNames.usuarios}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao deletar o registro ${ETableNames.usuarios}`);
     }
    
}