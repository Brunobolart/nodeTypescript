import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoa - GetById', () => {

    it('Buscar os Registros pelo ID', async () => {

        const res1 = await testServer.post('/pessoa')
            .send({
                nome: 'bruno',
                sobrenome: 'barros',
                email: 'bruno@gmail.com',
                cidadeId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer.get(`/pessoa/${res1.body}`)
            .send();

        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body).toHaveProperty('nome');
        expect(resBusca.body).toHaveProperty('sobrenome');

    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer.get('/pessoa/99999').send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');

    });





});