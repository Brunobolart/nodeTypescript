import { IAuth, ICidades,IPessoas,IUsuarios } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
    cidades: ICidades;
    pessoas: IPessoas;
    usuarios: IUsuarios,
    auth: IAuth
  }
}