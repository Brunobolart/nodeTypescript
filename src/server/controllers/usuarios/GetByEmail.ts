import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { UsuariosProviders } from "../../database/providers/usuarios";
import { Validation } from "../../shared/middlewares";


interface IParamsProps {
   email?: string;
}



export const getByEmailValidation = Validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        email: yup.string().email().required(),
        
    }))
    

}));


export const getByEmail = async (req: Request<IParamsProps>, res: Response) => {
    if(!req.params.email) 
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
            default: 'O parametro "Email" precisa ser informado!'
        }
    });

    
    const result = await UsuariosProviders.GetByEmail(req.params.email)
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }


    console.log(req.params);
    return res.status(StatusCodes.OK).send(result);


}

