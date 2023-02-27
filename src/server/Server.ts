import express  from 'express';
import 'dotenv/config';

import './shared/services/TraducoesYup';
import {router} from './routes';
// import cors from 'cors';


 
  const Server  =  express();
  
  const cors = require('cors');

  Server.use(cors());

  Server.use(express.json());
  Server.use(router);

export {Server};