import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetById', () => {

    it('Buscar os Registros pelo ID', async () => {
       
        const res1 = await testServer.post('/cidades')
        .send({
            cidade: 'Cafundo',
            estado: 'PE'
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer.get(`/cidades/${res1.body}`)
        .send();

        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body).toHaveProperty('cidade');
        expect(resBusca.body).toHaveProperty('estado');
        
    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer.get('/cidades/99999').send();
        
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');

    });

    



});