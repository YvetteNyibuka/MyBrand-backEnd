export default {
    patch: {
        tags:["Users"],
        description:"Update user by Id",
        operationId:"updateUser",
        security:[
            {
                BearerAuth:[]
            }
        ],
        parameters:[
            {
            name:"userId",
            in:"path",
            schema:{
                type:"string"
            },
            required:true
            }
        ],
        requestBody:{
            content :{
                "application/json": {
                    schema:{
                        type:"object",
                        properties:{
                            names:{type:"string", example:"user names"},
                            email:{type:"string", example:"Yvette"},
                        },
                        required:["names", "email"]
                    },
                },
            },
        },
        responses:{
            "200":{
                description:"User was updated",
                content:{
                    "application/json":{
                        schema:{
                            $ref:"#components/schemas/Users"
                        }
                    }
                }
            },
            "400":{
                description:"Bad Request",
                content:{
                    "application/json":{
                        example:{
                            status:false,
                            message:"Please fill all required fields"
                        }
                    }
                }
            },
            "401":{
                description:"Unauthorized",
                content:{
                    "application/json":{
                        example:{
                            status:false,
                            message:"Unauthorized"
                        }
                    }
                }
            }
        }
    }
}