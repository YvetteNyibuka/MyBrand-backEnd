import { Request, Response } from 'express';
import Querry from '../models/QuerrySchema';

// create a blog
export const httpCreateQuerry = async (req: Request, res: Response) => {
  try {
    const querry = new Querry({
      fullNames: req.body.fullNames,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    await querry.save();
    res.status(201).json({ message: 'querry created', data: querry });
  } catch (error) {
    console.error('Error creating querry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get all blogs
export const httpGetQuerries = async (req: Request, res: Response) => {
  
  try {
    const querries:any = await Querry.find({});    
    res.status(200).json({ message: "All querries", data: querries });
  } catch (error: any) {
    console.error("Error fetching querries:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

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



// delete blog
export const deletesingleQuerry = async (req: Request, res: Response) => {
  try {
    await Querry.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
