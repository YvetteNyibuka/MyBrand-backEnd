export default {
    post: {
        tags: ["Likes"],
        description: "Add new like",
        operationId: "addLike",
        security: [
            {
              BearerAuth: [],
            },
          ],
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    type: "string",
                },
                required: true,
            },
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            isLiked: { type: "boolean", example: true}
                        },
                        required: ["isLiked",],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "like added successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Like",
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
                            message: "An error occurred while adding the like",
                        },
                    },
                },
            },
        },
    },
    
};