import {NextFunction, Request, Response} from "express";
import { velidateJwt } from "../../../utils/JwtUtils";

class AuthMiddlewares {
    constructor(){}

    async userHasToken(req: Request, res: Response, next: NextFunction){
        if(!req.headers.authorization){
            return res.json({
                status: 401,
                message: "Token não fornecido"
            })
        }

        if(await velidateJwt(req.headers.authorization)){
            next();
        }else{
            return res.json({
                status: 401,
                message: "Token invalido"
            })
        }
        
    }

    async auth(req: Request, res: Response, next: NextFunction){
        if(req.url.includes("posts")){
            next();
            console.log("Olá")
        }else{
            res.json({
                status: 401
            })
        }
    }

    async isAdmin(req: Request, res: Response, next: NextFunction){
        if(req.url.includes("adm")){
            console.log("Adm");
            next();
        }else{
            res.json({
                status: 401,
                message: "Erro autorização"
            })
        }
    }
}

export default new AuthMiddlewares();