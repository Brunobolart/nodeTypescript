import express  from 'express';
import 'dotenv/config';

import './shared/services/TraducoesYup';
import {router} from './routes';


  const Server  =  express();

  Server.use(express.json());
  Server.use(router);

export {Server};