
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Knex } from "../../database/knex";
import { IUsuarios } from "../../database/models";
import { UsuariosProviders } from "../../database/providers/usuarios";

import { Validation } from "../../shared/middlewares";
import { JWTService, PasswordCrypto } from "../../shared/services";


interface IBodyProps extends Omit<IUsuarios, 'id' | 'nome' | 'data_cad' | 'permissao'> { }



export const signInValidation = Validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().min(5).required(),
        senha: yup.string().min(6).max(20).required(),
        
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

    const passwordMatch = await PasswordCrypto.verityPassword(senha, result.senha);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: Error('Senha incorreta!')
            }
        });
    } else {

        const accessToken = JWTService.sign({uid: result.id})
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
           
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: Error('Erro ao gerar o token de acesso!')
                }
            });
        }
        

        console.log(req.body);
        return res.status(StatusCodes.OK).json({accessToken});
    }





}

