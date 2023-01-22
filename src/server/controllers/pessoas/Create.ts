import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Knex } from "../../database/knex";
import { IPessoas } from "../../database/models";
import { PessoasProviders } from "../../database/providers/pessoas";

import { Validation } from "../../shared/middlewares";


interface IBodyProps extends Omit<IPessoas, 'id'> {}



export const createValidation = Validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().min(3).max(150).required(),
        sobrenome: yup.string().min(3).max(150).required(),
        email: yup.string().email().required(),
        cidadeId: yup.number().integer().required()
    }))
    

}));


export const Create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
   
    const result = await PessoasProviders.Create(req.body);
    
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

