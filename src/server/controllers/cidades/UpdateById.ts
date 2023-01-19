import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { ICidades } from "../../database/models";
import { Validation } from "../../shared/middlewares";


interface IParamsProps {
   id?: number;
}

interface IBodyProps extends Omit<ICidades, 'id'> {}



export const updateByIdValidation = Validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
        
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        cidade: yup.string().required().min(3),
        estado: yup.string().required().min(2).max(2)
        
    }))
    

}));


export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
   
    if(Number(req.params.id) === 99999) 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
            default: 'Registro não encontrado!'
        }
    });

    console.log(req.params);
    console.log(req.body);
    
    return res.status(StatusCodes.NO_CONTENT).send();


}

