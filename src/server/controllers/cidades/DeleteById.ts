import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { CidadesProviders } from "../../database/providers";
import { Validation } from "../../shared/middlewares";


interface IParamsProps {
   id?: number;
}



export const deleteByIdValidation = Validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
        
    }))
    

}));


export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    
    if(!req.params.id) 
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
            default: 'O parametro "iD" precisa ser informado!'
        }
    });

    const result = await CidadesProviders.DeleteById(req.params.id)
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }


    console.log(req.params);
    return res.status(StatusCodes.NO_CONTENT).send();


}

