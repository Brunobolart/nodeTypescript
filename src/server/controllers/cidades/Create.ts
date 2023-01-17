import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Validation } from "../../shared/middlewares";


interface ICidades {
   cidade: string;
   estado: string;
}



export const createValidation = Validation((getSchema) => ({
    body: getSchema<ICidades>(yup.object().shape({
        cidade: yup.string().min(3).required(),
        estado: yup.string().min(2).max(2).required()
    }))
    

}));


export const Create = async (req: Request<{}, {}, ICidades>, res: Response) => {
   
    console.log(req.body);
    return res.status(StatusCodes.CREATED).json(1);


}

