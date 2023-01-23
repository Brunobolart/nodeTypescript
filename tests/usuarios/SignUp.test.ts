import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Usuarios - SignUp', () => {

    

    it('Criar usuário 1', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Bruno Barros',
               email: 'bruno@gmail.com',
               senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Criar usuário 2', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Pedro Barros',
               email: 'pedro@gmail.com',
               senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Criar usuário com email duplicado', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Pedro Barros',
               email: 'pedroduplicado@gmail.com',
               senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer.post('/cadastrar')
            .send({
               nome: 'Carlos Barros',
               email: 'pedroduplicado@gmail.com',
               senha: '123456'
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');

    });

    it('Erro ao tentar Criar usuário sem email', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Pedro Barros',
               senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');

    });

    it('Erro ao tentar Criar usuário sem senha', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Pedro Barros',
               email: 'bruno@gmail.com'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');

    });

    it('Erro ao tentar Criar usuário com email invalido', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Pedro Barros',
               email: 'bruno gmail.com',
               senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');

    });

    it('Erro ao tentar Criar usuário com senha pequena', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Pedro Barros',
               email: 'bruno@gmail.com',
               senha: '123'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');

    });

    it('Erro ao tentar Criar usuário com nome pequeno', async () => {
        const res1 = await testServer.post('/cadastrar')
            .send({
               nome: 'Pe',
               email: 'bruno@gmail.com',
               senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');

    });






});