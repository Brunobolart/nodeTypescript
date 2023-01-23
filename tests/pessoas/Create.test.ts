import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {

    let cidadeId: number | undefined = undefined;
    beforeAll(async () => {
      const resCidade = await testServer
        .post('/cidades')
        .send({ cidade: 'Imperatriz', uf: 'MA' });
  
      cidadeId = resCidade.body;
    });

    it('Criar registro', async () => {
        const res1 = await testServer.post('/pessoas')
            .send({
               nome: 'bruno',
               sobrenome: 'barros',
               email: 'bruno@gmail.com',
               cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Tentar criar pessoa validando qtd de caracteres esperado pelos campos!', async () => {
        const res1 = await testServer.post('/pessoas')
            .send({
                nome: 'br',
                sobrenome: 'b',
                email: 'bruno@gmail.com',
                cidadeId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
        expect(res1.body).toHaveProperty('errors.body.sobrenome');

    });



});