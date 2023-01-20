import { Knex } from './server/database/knex';
import { Server } from './server/Server';

const startServer = () => {
    Server.listen(process.env.PORT || 3333, () => {
        console.log(`Node rodando! ${process.env.PORT}`)
    });
}

if (process.env.TS_LOCALHOST !== 'true') {
    Knex.migrate.latest().then(() => {
        Knex.seed.run().then(() => startServer()).catch(console.log);
    }).catch(console.log);
}else{
    startServer();
}

