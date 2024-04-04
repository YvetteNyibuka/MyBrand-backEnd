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
        if(decodedToken.role !== 'admin' || !decodedToken)return res.status(403).json({message:"Access denied"});
        next()
    } catch(err){
        res.status(500).json({status: 'fail' , message: "Internal Server Error"});
    }
}
export const isUser = async (req: Request, res: Response, next: NextFunction) => {
    const headerValues = req.headers.authorization;
    if(!headerValues){
        return res.status(403).json({message: "You have to login first"});
    }

    const token:any = req.headers.authorization?.split(" ")[1]; 
    try{
        const decodedToken: any = jwt.verify(token,   process.env.MY_SECRET_KEY || "FYSHAFRW" ) as jwtPayload; 
        if(!decodedToken.role)return res.status(403).json({message:"You have to login first"});
        next()
    } catch(err){
        res.status(500).json({status: 'fail' , message: "You have to login first"})
    }
}

