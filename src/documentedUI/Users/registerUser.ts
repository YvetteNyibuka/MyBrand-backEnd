export default {
    post: {
        tags: ["Auth"],
        description: "Add new User",
        operationId: "addUser",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            names: { type: "string" },
                            email: { type: "string", format: "email" },
                            password: { type: "string", minLength: 8 },
                        },
                        required: ["names", "email", "password"],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "User added successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Users",
                        },
                    },
                },
            },
            "400": {
                description: "Bad Request",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "Please fill all required fields",
                        },
                    },
                },
            },
            "500": {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "An error occurred while adding the user",
                        },
                    },
                },
            },
        },
    },
    
};