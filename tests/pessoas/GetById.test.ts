import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('pessoas - GetById', () => {

    it('Buscar os Registros pelo ID', async () => {

        const res1 = await testServer.post('/pessoas')
            .send({
                nome: 'bruno',
                sobrenome: 'barros',
                email: 'bruno@gmail.com',
                cidadeId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer.get(`/pessoas/${res1.body}`)
            .send();

        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body).toHaveProperty('nome');
        expect(resBusca.body).toHaveProperty('sobrenome');

    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer.get('/pessoas/99999').send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');

    });





});