export default {
    get:{
        tags: ["Blogs"],
        description: "Get all blogs",
        operationId: "getAllBlogs",
        responses: {
            "200": {
                description: "Blogs with comments",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Blog",
                        },
                    },
                },
            },
            "404": {
                description: "No blogs found",
            },
            "500": {
                description: "Internal server error",
            },
        },
    },
    }