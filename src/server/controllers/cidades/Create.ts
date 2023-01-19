import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Knex } from "../../database/knex";
import { ICidades } from "../../database/models";
import { CidadesProviders } from "../../database/providers";

import { Validation } from "../../shared/middlewares";


interface IBodyProps extends Omit<ICidades, 'id'> {}



export const createValidation = Validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        cidade: yup.string().min(3).max(150).required(),
        estado: yup.string().min(2).max(2).required()
    }))
    

}));


export const Create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
   
    const result = await CidadesProviders.Create(req.body);
    
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

