import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController } from './../controllers';

const router = Router();


router.get('/', (req,  res)  =>  {
    res.send('Olá, Dev!');
  });

  
router.post('/cidades', CidadesController.Create);

// return res.status(StatusCodes.UNAUTHORIZED).json(req.body);


export {router};