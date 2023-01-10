import express  from 'express';

import {router} from './routes';

  const Server  =  express();

  Server.use(express.json());
  Server.use(router);

export {Server};