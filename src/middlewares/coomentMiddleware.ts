import { Request, Response, NextFunction } from 'express';
import validateComment from '../validations/commentValidation';

const isValid = (req: Request, res: Response, next: NextFunction) => {
  const {error} = validateComment(req.body)
  if(error)
 return res.status(400).json({message: error.details[0].message});
 try{
 next();
 } catch(error){
   console.log("Error: ", error);
   
 }
  
};

export default isValid;