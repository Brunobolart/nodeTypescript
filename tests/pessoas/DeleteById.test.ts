import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - DeleteById', () => {

    it('Apaga registro pelo ID', async () => {

       
        const res1 = await testServer.post('/pessoas')
            .send({
                nome: 'bruno',
                sobrenome: 'barros',
                email: 'bruno@gmail.com',
                cidadeId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer.delete(`/pessoas/${res1.body}`).send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);


    });

    it('Apaga registro que não existe', async () => {
        const res1 = await testServer.delete('/pessoas/99999').send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');

    });





});