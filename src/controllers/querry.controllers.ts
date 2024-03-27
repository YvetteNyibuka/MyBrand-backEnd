import { Request, Response } from 'express';
import Querry from '../models/QuerrySchema';

export const httpCreateQuerry = async (req: Request, res: Response) => {
  try {
    const querry = new Querry({
      fullNames: req.body.fullNames,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    await querry.save();
    res.status(201).json({ message: 'Message sents successfully', data: querry });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const httpGetQuerries = async (req: Request, res: Response) => {
  
  try {
    const querries:any = await Querry.find({});    
    res.status(200).json({ message: "All querries", data: querries });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// responses hve to be customised
export const httpGetOneQuerry = async (req: Request, res: Response) => {
  try {
    const singleQuerry = await Querry.findOne({ _id: req.params.id });
    
    if (!singleQuerry) {
      return res.status(404).json({ message: "Querry not found", data: {} });
    }

    res.status(200).json({ message: "Querry found", data: singleQuerry });
  } catch (error) {
    console.error('Error fetching querry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// delete query
export const deletesingleQuerry = async (req: Request, res: Response) => {
  try {
    const deletedQuery = await Querry.deleteOne({ _id: req.params.id });
    if(deletedQuery.deletedCount === 0){
      return res.status(404).json({ message:"Querry not found"});
    }
    res.status(204);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
