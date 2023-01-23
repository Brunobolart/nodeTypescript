
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Knex } from "../../database/knex";
import { IUsuarios } from "../../database/models";
import { UsuariosProviders } from "../../database/providers/usuarios";

import { Validation } from "../../shared/middlewares";


interface IBodyProps extends Omit<IUsuarios, 'id'> {}



export const signUpValidation = Validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().min(3).max(150).required(),
        email: yup.string().email().min(5).required(),
        senha:  yup.string().min(6).max(20).required()
    }))
    

}));


export const SignUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
   
    const result = await UsuariosProviders.Create(req.body);
    
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    
    console.log(req.body);
    return res.status(StatusCodes.CREATED).json(result);



}


