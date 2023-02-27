import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services";
import { LocalStorage } from "node-localstorage";


export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const localStorage = new LocalStorage('./scratch');
    const {authorization} = req.headers;
    
    

    if(!authorization){
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
            default: 'Não autorizado!'
        }
      })
    }else{

      // imprime o token bearer
     console.log(authorization);

    const [type, token] = authorization.split(' ');
   
    if(type !== 'Bearer'){
        res.status(StatusCodes.UNAUTHORIZED).json({
          errors: {
              default: 'Tipo do token invalido!'
          }
        })
      }

      
      const JWTData = JWTService.verify(token);

      if(JWTData === 'JWT_SECRET_NOT_FOUND'){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors: {
              default: 'Erro ao verificar o token!'
          }
        })
      }else if(JWTData === 'INVALID_TOKEN'){
        res.status(StatusCodes.UNAUTHORIZED).json({
          errors: {
              default: 'Não autenticado!'
          }
        })
      }else{

      console.log(JWTData);
      req.headers.idUsuario = JWTData.uid.toString();
      localStorage.setItem('userId',JWTData.uid.toString());
      
    }

      }

      
    
    return next();
}