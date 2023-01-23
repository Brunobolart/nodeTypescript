import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('pessoas - UpdateById', () => {

    it('Atualiza os Registros pelo ID', async () => {

        const res1 = await testServer.post('/pessoas')
            .send({
                nome: 'bruno',
                sobrenome: 'barros',
                email: 'bruno@gmail.com',
                cidadeId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer.put(`/pessoas/${res1.body}`)
            .send({
                nome: 'bruno',
                sobrenome: 'Albuquerque',
                email: 'bruno@gmail.com',
                cidadeId: 1
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
        // expect(resAtualizada.body).toHaveProperty('nome');
        // expect(resAtualizada.body).toHaveProperty('sobrenome');

    });

    it('Tenta Atualizar registro que não existe', async () => {
        const res1 = await testServer.get('/pessoas/99999').send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');

    });





});