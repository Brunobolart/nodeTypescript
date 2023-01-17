import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {

    it('Criar registro', async () => {
        const res1 = await testServer.post('/cidades')
            .send({
                cidade: 'Cafundo',
                estado: 'PE'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Tentar criar cidade validando qtd de caracteres esperado pelos campos!', async () => {
        const res1 = await testServer.post('/cidades')
            .send({
                cidade: 'Ca',
                estado: 'P'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidade');
        expect(res1.body).toHaveProperty('errors.body.estado');

    });



});