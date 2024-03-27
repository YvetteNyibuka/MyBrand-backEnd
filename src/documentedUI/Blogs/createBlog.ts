export default {
    post: {
        tags: ["Blogs"],
        description: "Add new blog",
        operationId: "addBlog",
        security: [
            {
              BearerAuth: [],
            },
          ],
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            title: { type: "string" },
                            description: { type: "string" },
                            coverImage: { type: "string", format: "binary" },
                        },
                        required: ["title", "description", "coverImage"],
                    },
                },
            },
        },
        responses: {
            "201": {
                description: "Blog created successfuly",
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/Blog",
                        },
                    },
                },
            },
            "400": {
                description: "Bad Request",
                content: {
                    "multipart/form-data": {
                        example: {
                            status: false,
                            message: "Please fill all required fields",
                        },
                    },
                },
            },
            "500": {
                description: "internal server error",
                content: {
                    "multipart/form-data": {
                        example: {
                            status: false,
                            message: "An error occurred while adding the blog",
                        },
                    },
                },
            },
        },
    },
    
};