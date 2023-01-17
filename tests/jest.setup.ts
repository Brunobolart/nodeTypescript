import supertest from 'supertest';

import {Server} from '../src/server/Server';


export const testServer = supertest(Server);