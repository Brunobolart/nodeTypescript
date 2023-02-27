import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export const UpdateById = async (id: number,dados: Omit<IUsuarios, 'id'>): Promise<void | Error> => {
     try {

         const hashPassword = await PasswordCrypto.hashPassword(dados.senha);
         
         const result = await Knex(ETableNames.usuarios).update({...dados, senha: hashPassword }).where('id','=',id);
         
         if(result > 0) return;
         
         return new Error(`Erro ao atualizar o registro ${ETableNames.usuarios}`);
       
     } catch (error) {
        console.log(error);
        return new Error(`Erro ao atualizar o registro ${ETableNames.usuarios}`);
     }
    
}