import express  from 'express';


  const Server  =  express();

   interface Iaut{

   }


  Server.get('/', (req,  res)  =>  {
  res.send('Olá, Dev!');
});

export {Server};