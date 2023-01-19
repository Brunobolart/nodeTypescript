import { ICidades } from '../../models';


declare module 'knex/types/tables' {
  interface Tables {
    cidades: ICidades
    // pessoas: IPessoas
    // usuarios: IUsuarios
  }
}