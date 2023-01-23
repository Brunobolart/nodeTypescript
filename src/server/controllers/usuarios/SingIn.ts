
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Knex } from "../../database/knex";
import { IUsuarios } from "../../database/models";
import { UsuariosProviders } from "../../database/providers/usuarios";

import { Validation } from "../../shared/middlewares";


interface IBodyProps extends Omit<IUsuarios, 'id' | 'nome'> { }



export const signInValidation = Validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().min(5).required(),
        senha: yup.string().min(6).max(20).required()
    }))


}));


export const SignIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { email, senha } = req.body;


    const result = await UsuariosProviders.GetByEmail(email);

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: Error('Email invalido!')
            }
        });
    }

    if (senha !== result.senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: Error('Senha incorreta!')
            }
        });
    } else {

        console.log(req.body);
        return res.status(StatusCodes.OK).json({accessToken: 'teste.teste.teste'});
    }





}

