import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { ICidades, IPessoas } from "../../database/models";
import { PessoasProviders } from "../../database/providers/pessoas";
import { Validation } from "../../shared/middlewares";


interface IParamsProps {
   id?: number;
}

interface IBodyProps extends Omit<IPessoas, 'id'> {}



export const updateByIdValidation = Validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
        
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().min(3).max(150).required(),
        sobrenome: yup.string().min(3).max(150).required(),
        sexo: yup.string().max(15).required(),
        patrimonio: yup.string().max(150).required(),
        email: yup.string().email().required(),
        idade: yup.number().integer().required(),
        habilidades: yup.string().max(255).required(),
        profissao: yup.string().max(150).required(),
        deficiente: yup.boolean().required(),
        numeroSapato: yup.number().integer().max(60).required(),
        dataNascimento: yup.string().required(),
        dataHoraCad: yup.string().required(),
        horaEvento: yup.string().required(),
        cidadeId: yup.number().integer().required()
        
    }))
    

}));


export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
   
    if(!req.params.id) 
    return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
            default: 'O parametro "iD" precisa ser informado!'
        }
    });

    
    const result = await PessoasProviders.UpdateById(req.params.id, req.body)
    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }

    console.log(req.params);
    console.log(req.body);
    
    return res.status(StatusCodes.NO_CONTENT).json(result);


}

