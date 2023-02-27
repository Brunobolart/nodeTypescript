import * as getByEmail from './GetByEmail';
import * as signIn from './SingIn';
import * as signUp from './SingUp';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';

export const UsuariosController = {
    ...getById,
    ...getByEmail,
    ...signIn,
    ...signUp,
    ...getAll,
    ...updateById,
    ...deleteById
}
