import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController, PessoasController } from './../controllers';

const router = Router();


router.get('/', (req, res) => {
  res.send('Olá, Dev!');
});

// CIDADES 
router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id',CidadesController.getByIdValidation,CidadesController.getById);
router.put('/cidades/:id',CidadesController.updateByIdValidation,CidadesController.updateById);
router.delete('/cidades/:id',CidadesController.deleteByIdValidation,CidadesController.deleteById);
router.post('/cidades',CidadesController.createValidation,CidadesController.Create);
// -- CIDADES -- //


// PESSOAS 
router.get('/pessoa', PessoasController.getAllValidation, PessoasController.getAll);
router.get('/pessoa/:id',PessoasController.getByIdValidation,PessoasController.getById);
router.put('/pessoa/:id',PessoasController.updateByIdValidation,PessoasController.updateById);
router.delete('/pessoa/:id',PessoasController.deleteByIdValidation,PessoasController.deleteById);
router.post('/pessoa',PessoasController.createValidation,PessoasController.Create);
// -- PESSOAS -- //

// return res.status(StatusCodes.UNAUTHORIZED).json(req.body);


export { router };