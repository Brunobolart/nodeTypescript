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
router.get('/cidades',ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id',ensureAuthenticated, CidadesController.getByIdValidation,CidadesController.getById);
router.put('/cidades/:id',ensureAuthenticated, CidadesController.updateByIdValidation,CidadesController.updateById);
router.delete('/cidades/:id',ensureAuthenticated, CidadesController.deleteByIdValidation,CidadesController.deleteById);
router.post('/cidades',ensureAuthenticated, CidadesController.createValidation,CidadesController.Create);
// -- CIDADES -- //


// PESSOAS 
router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation,PessoasController.getById);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation,PessoasController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation,PessoasController.deleteById);
router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation,PessoasController.Create);
// -- PESSOAS -- //

// USUÁRIOS 
router.post('/entrar',UsuariosController.signInValidation,UsuariosController.SignIn, (req, res) => {
       
      res.header("Access-Control-Allow-Origin", "*");
});

router.post('/cadastrar',UsuariosController.signUpValidation,UsuariosController.SignUp);

router.put('/usuarios/:id', ensureAuthenticated, UsuariosController.updateByIdValidation,UsuariosController.updateById);
router.delete('/usuarios/:id', ensureAuthenticated, UsuariosController.deleteByIdValidation,UsuariosController.deleteById);
router.get('/usuarios', ensureAuthenticated, UsuariosController.getAllValidation, UsuariosController.getAll);
router.get('/usuarios/:id', ensureAuthenticated, UsuariosController.getByIdValidation, UsuariosController.getById);
// -- USUÁRIOS -- //


// return res.status(StatusCodes.UNAUTHORIZED).json(req.body);


export { router };