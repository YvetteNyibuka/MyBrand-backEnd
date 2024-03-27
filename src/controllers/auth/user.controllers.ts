import { Request, Response } from "express";
import User from "../../models/auth/userSchema";
import bcrypt from 'bcrypt'


export const httpCreateUser = async (req: Request, res: Response) => {
  try {
    const { names, email } = req.body;
    const { password } = req.body;
    const { role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "Email already registered. Please choose another one.",
        });
    }
    const user = new User({
      names: names,
      email: email,
      password: hashedPassword,
      role: role,
    });
    await user.save();
    const savedUser = await User.findById(user._id);
   if(savedUser) {
    const response = {
      _id: savedUser._id,
      names: savedUser.names,
      email: savedUser.email,
      role: savedUser.role,  
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    };


    res
      .status(201)
      .json({ message: "user registered successfully ", data: response });
  }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const httpGetUsers = async (req: Request, res: Response) => {
  try {
    const users: any = await User.find({});
    if(!users) {
      res.status(404).json({ message: "No users found", data: {}})
      return;
    }
    res.status(200).json({ message: "All users registered", data: users });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const httpGetOneUser = async (req: Request, res: Response) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.id });
    if (!singleUser) {
      return res.status(404).json({ message: "User not found", data: {} });
    }

    res.status(200).json({ message: "User found", data: singleUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const httpUpdateOneUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id.trim();
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    user.names = req.body.names;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();
    return res.status(200).json({ message: "User updated successfully", data: user });
  } 
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const deletesingleUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    
    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

