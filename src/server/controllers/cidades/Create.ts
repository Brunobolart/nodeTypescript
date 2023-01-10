import { Request, Response } from "express";

interface ICidades {
    id: BigInteger,
    cidade: string;
    estado: string;
}


export const Create = (req: Request<{}, {}, ICidades>, res: Response) => { 
   
    const data: ICidades = req.body;
    console.log(data);
    return res.send('Create');

}

