import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController } from './../controllers';

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

// return res.status(StatusCodes.UNAUTHORIZED).json(req.body);


export { router };