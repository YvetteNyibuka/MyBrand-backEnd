import { Request, Response } from "express";
import User from "../../models/auth/userSchema";
import Jwt  from "jsonwebtoken";
import dotenv from "dotenv";

require('dotenv').config();
export const httpLogin = async (req: Request, res: Response) => {
    try{
        const user = req.body;
        const { email, password } = user;

        const isUserExist = await User.findOne({
            email: email,
          });

          if (!isUserExist) {
            res.status(404).json({
              status: 404,
              success: false,
              message: "User not found",
            });
             return;
          }

          const isPasswordMatched =
          isUserExist?.password === password;
          if (!isPasswordMatched) {
            res.status(400).json({
              status: 400,
              success: false,
              message: "wrong password",
            });
              return;
          }

          const token = Jwt.sign(
            { _id: isUserExist?._id, email: isUserExist?.email },
            process.env.MY_SECRET_KEY?process.env.MY_SECRET_KEY:"FYSHAFRW",
            {
              expiresIn: "1d",
            }
          );
          res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
          });
    }catch(error: any){
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
          });
    }
}