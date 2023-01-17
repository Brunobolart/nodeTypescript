import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetById', () => {

    it('Atualiza os Registros pelo ID', async () => {
       
        const res1 = await testServer.post('/cidades')
        .send({
            cidade: 'Cafundo',
            estado: 'PE'
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer.put(`/cidades/${res1.body}`)
        .send({
            cidade: 'Limoeiro',
            estado: 'PE'
        });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
       // expect(resAtualizada.body).toHaveProperty('cidade');
       // expect(resAtualizada.body).toHaveProperty('estado');
        
    });

    it('Tenta Atualizar registro que não existe', async () => {
        const res1 = await testServer.get('/cidades/99999').send();
        
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');

    });

    



});