import { Request, Response } from "express";
import User from "../../models/auth/userSchema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const httpLogin = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const { email, password } = user;

        const isUserExist = await User.findOne({ email: email });

        if (!isUserExist) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Wrong password",
            });
        }

            const token = jwt.sign(
                { 
                    _id: isUserExist._id,
                    names: isUserExist.names,
                    email: isUserExist.email,
                    role: isUserExist.role 
                },
                process.env.MY_SECRET_KEY || "FYSHAFRW",
                {
                    expiresIn: "1d",
                }
            );

            res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Login success",
            token: token,
            user: isUserExist
        });
    } catch (error: any) {
        return res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
};
