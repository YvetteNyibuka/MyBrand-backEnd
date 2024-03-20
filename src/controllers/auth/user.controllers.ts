import { Request, Response } from "express";
import User from "../../models/auth/userSchema";
import bcrypt from 'bcrypt'

// create a user
export const httpCreateUser = async (req: Request, res: Response) => {
  try {
    const { names, email} = req.body;
    const { password } = req.body;
    const { role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); 


          const user = new User({
            names: names,
            email: email,
            password: hashedPassword,
            role: role
          });
          await user.save();
          res.status(201).json({ message: "user registered successfully ", data: user });
        }
    catch (error) {
    console.error("Error error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all users
export const httpGetUsers = async (req: Request, res: Response) => {
  try {
    const users: any = await User.find({});
    res.status(200).json({ message: "All users", data: users });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update single user
export const httpUpdateOneUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id.trim();

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    if (req.body.names) {
      user.names = req.body.names;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete User
export const deletesingleUser = async (req: Request, res: Response) => {
  try {
    
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
