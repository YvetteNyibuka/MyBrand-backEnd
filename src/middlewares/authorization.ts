import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

interface jwtPayload {
    _id: string,
    names: string,
    email: string,
    role: string
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const headerValues = req.headers.authorization;
    if(!headerValues){
        return res.status(403).json({message: "access denied"});
    }

    const token:any = req.headers.authorization?.split(" ")[1]; 
    try{
        const decodedToken: any = jwt.verify(token,   process.env.MY_SECRET_KEY || "FYSHAFRW" ) as jwtPayload;
        if(decodedToken.role !== 'admin' || !decodedToken)return res.status(403).json({message:"access denied"});
        next()
    } catch(err){
        res.status(400).json({status: 'fail' , message: "Invalid token"})
    }
}
export const isUser = async (req: Request, res: Response, next: NextFunction) => {
    const headerValues = req.headers.authorization;
    if(!headerValues){
        return res.status(403).json({message: "access denied"});
    }

    const token:any = req.headers.authorization?.split(" ")[1]; 
    try{
        const decodedToken: any = jwt.verify(token,   process.env.MY_SECRET_KEY || "FYSHAFRW" ) as jwtPayload;
      
        
        if(!decodedToken.role)return res.status(403).json({message:"you are not logged in"});
        next()
    } catch(err){
        res.status(400).json({status: 'fail' , message: "Invalid token"})
    }
}

