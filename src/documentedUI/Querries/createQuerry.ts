export default {
    post: {
        tags: ["Querries"],
        description: "Add new Querry",
        operationId: "addQueryy",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            fullNames: { type: "string" },
                            email: { type: "string", format: "email" },
                            subject: { type: "string", format: "email" },
                            message: { type: "string" },
                        },
                        required: ["names", "email", "subject", "message"],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "Message sents successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Querries",
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
                            message: "An error occurred while sending the querry",
                        },
                    },
                },
            },
        },
    },
    
};