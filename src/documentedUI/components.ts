import { Schema } from "mongoose";

export default {
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },
      },
  
      schemas: {
        Users: {
          type: "object",
          properties: {
            names: {
              type: "string",
              description: "full names",
              example: "John",
            },
            email: {
              type: "string",
              description: "Email address",
              example: "test@gmail.com",
            },
            password: {
              type: "string",
              description: "Password",
              example: "12345678",
            },
            role: {
              type: "string",
              description: "Role",
              example: "buyer",
            }
          },
        },
        Blog:{
          type: "object",
          properties:{
            title:{
              type:'string',
              description: "blog title",
              example:'Phones are very important in communication',
            },
            description:{
              type:'string',
              description:"enter the blog description"
            },
            coverImage:{
              type:'string',
              description:"Provide a cover image"
            },
          },
        },
        Comments:{
          type: "object",
          properties:{
            blogId:{
              type:'string',
              description: "blog id",
            },
            commentMessage:{
              type:'string',
              description:"enter the message"
            },
            username:{
              type:'string',
              description:"Provide a name of commenting person"
            },
          },
        },
        Like:{
          type: "object",
          properties:{
            blogId:{
              type:'string',
              description: "blog id",
            },
            userId:{
              type:'string',
              description:"enter the message"
            },
            isLiked:{
              type:'boolean',
              description:"Provide a name of commenting person"
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "Not found",
            },
            internal_code: {
              type: "string",
              description: "Error internal code",
              example: "Invalid parameters",
            },
          },
        },
      },
    },
  };

