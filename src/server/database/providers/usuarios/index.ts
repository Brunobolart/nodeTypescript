import * as create from './Create';
import * as getByEmail from './GetByEmail';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as Count from './Count';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';


export const UsuariosProviders = {
    ...getById,
    ...create,
    ...getByEmail,
    ...getAll,
    ...Count,
    ...deleteById,
    ...updateById
    
}
