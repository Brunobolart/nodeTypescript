import * as create from './cidades/Create';
import * as getAll from './cidades/GetAll';
import * as getById from './cidades/GetById';
import * as updateById from './cidades/UpdateById';
import * as deleteById from './cidades/DeleteById';
import * as count from './cidades/Count';

export const CidadesProviders = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
    ...count
}
