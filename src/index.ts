import {Server} from './server/Server';


Server.listen(process.env.PORT || 3333,() => {
    console.log(`Node rodando! ${process.env.PORT}`)
});

