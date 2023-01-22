import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetAll', () => {

    it('Buscar todos os Registros', async () => {

        const res1 = await testServer.post('/pessoa')
            .send({
                nome: 'bruno',
                sobrenome: 'barros',
                email: 'bruno@gmail.com',
                cidadeId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer.get('/pessoa')
            .send();

        expect(Number(resBusca.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        //  expect(resBusca.body.length).toBeGreaterThan(0);

    });


});