import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsuariosController } from '../controllers/usuarios';
import { ensureAuthenticated } from '../shared/middlewares';
import { CidadesController, PessoasController } from './../controllers';


const router = Router();


router.get('/', (req, res) => {
  res.send('Olá, Dev!');
});

// CIDAES 
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation,CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation,CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation,CidadesController.deleteById);
router.post('/cidades', CidadesController.createValidation,CidadesController.Create);
// -- CIDADES -- //


// PESSOAS 
router.get('/pessoas',  PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id',  PessoasController.getByIdValidation,PessoasController.getById);
router.put('/pessoas/:id',  PessoasController.updateByIdValidation,PessoasController.updateById);
router.delete('/pessoas/:id',  PessoasController.deleteByIdValidation,PessoasController.deleteById);
router.post('/pessoas',  PessoasController.createValidation,PessoasController.Create);
// -- PESSOAS -- //

// USUÁRIOS 
router.post('/entrar',UsuariosController.signInValidation,UsuariosController.SignIn);
router.post('/cadastrar',UsuariosController.signUpValidation,UsuariosController.SignUp);
// -- USUÁRIOS -- //


// return res.status(StatusCodes.UNAUTHORIZED).json(req.body);


export { router };