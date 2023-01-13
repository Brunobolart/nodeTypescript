import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Validation } from "../../shared/middlewares";


interface IParamsProps {
   id?: number;
}

interface IBodyProps {
    cidade?: string;
    estado?: string;
 }



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
   
    console.log(req.params);
    console.log(req.body);
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');


}

