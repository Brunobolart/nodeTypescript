import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
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
    
    if(Number(req.params.id) === 99999) 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
            default: 'Registro não encontrado!'
        }
    });

    console.log(req.params);
    return res.status(StatusCodes.NO_CONTENT).send();


}

