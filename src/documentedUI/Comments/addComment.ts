export default {
    post: {
        tags: ["Comments"],
        description: "Add new comment",
        operationId: "addComment",
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
                            commentMessage: { type: "string" }
                        },
                        required: ["commentMessage",],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "Comment added to blog successfuly",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Comments",
                        },
                    },
                },
            },
            "500": {
                description: "Internal server error",
                content: {
                    "application/json": {
                        example: {
                            status: false,
                            message: "An error occurred while adding the comment",
                        },
                    },
                },
            },
        },
    },
    
};