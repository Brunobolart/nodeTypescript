import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { CidadesProviders } from "../../database/providers/cidades";
import { Validation } from "../../shared/middlewares";


interface IQueryProps {
   id?: number;
   page?: number;
   limit?: number;
   filter?: string;
}



export const getAllValidation = Validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().notRequired().moreThan(0),
        limit: yup.number().notRequired().moreThan(0),
        id: yup.number().integer().notRequired().default(0),
        filter: yup.string().notRequired()
    }))
    

}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
     const result = await CidadesProviders.GetAll(req.query.page || 1, req.query.limit || 7, 
        req.query.filter || '', Number(req.query.id));

     const count = await CidadesProviders.Count(req.query.filter);

     if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }else if (count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: count.message
            }
        });
    }


    res.setHeader('access-control-expose-headers','x-total-count');
    res.setHeader('x-total-count',count);

    console.log(req.query);
    console.log('idUsuario '+req.headers.idUsuario);
         

    return res.status(StatusCodes.OK).json(result);


}

