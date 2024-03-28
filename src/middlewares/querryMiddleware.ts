import { Request, Response, NextFunction } from 'express';
import ValidateQuerry from '../validations/querryValidate';

const isValid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ValidateQuerry(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message.replace(/["\\]/g, '') });

  try {
    next();
  } catch (error) {
    console.log('error', error);
  }
};

export default isValid;
