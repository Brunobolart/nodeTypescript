import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { Validation } from "../../shared/middlewares";


interface IQueryProps {
   page?: number;
   limit?: number;
   filter?: string;
}



export const getAllValidation = Validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().notRequired().moreThan(0),
        limit: yup.number().notRequired().moreThan(0),
        filter: yup.string().notRequired()
    }))
    

}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
   
    res.setHeader('access-control-expose-headers','x-total-count');
    res.setHeader('x-total-count',1);

    console.log(req.query);
    return res.status(StatusCodes.OK).json({
        id: 1,
        cidade: 'Cafundo',
        estado: 'PE'
    });


}

