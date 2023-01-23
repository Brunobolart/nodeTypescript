import * as getByEmail from './GetByEmail';
import * as signIn from './SingIn';
import * as signUp from './SingUp';

export const UsuariosController = {
    ...getByEmail,
    ...signIn,
    ...signUp
}
