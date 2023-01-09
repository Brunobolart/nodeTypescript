import express  from 'express';

const Server = express();

Server.get('/',(req, res) => {

       res.send('Olá, Dev!');

})


export { Server };