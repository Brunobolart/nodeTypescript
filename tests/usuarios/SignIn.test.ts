import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Usuarios - SignIn', () => {

    beforeAll(async () => {
         await testServer
        .post('/cadastrar')
        .send({ nome: 'Bruno Barros', email: 'bruno@gmail.com', senha: '123456' });
  
    });

    it('Faz login', async () => {
        const res1 = await testServer.post('/entrar')
            .send({
               email: 'bruno@gmail.com',
               senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');

    });

    it('Senha errada!', async () => {
        const res1 = await testServer.post('/entrar')
            .send({
                email: 'bruno@gmail.com',
                senha: '1234567'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');

    });

    it('Email errado!', async () => {
        const res1 = await testServer.post('/entrar')
            .send({
                email: 'brunoeeeeee@gmail.com',
                senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');

    });

    it('Email invalido!', async () => {
        const res1 = await testServer.post('/entrar')
            .send({
                email: 'bruno gmail.com',
                senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');

    });

    it('Senha pequena!', async () => {
        const res1 = await testServer.post('/entrar')
            .send({
                email: 'bruno@gmail.com',
                senha: '123'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');

    });

    it('Senha não informada!', async () => {
        const res1 = await testServer.post('/entrar')
            .send({
                email: 'bruno@gmail.com'
                
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');

    });

    it('Email não informada!', async () => {
        const res1 = await testServer.post('/entrar')
            .send({
                senha: '123456'
                
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');

    });



});