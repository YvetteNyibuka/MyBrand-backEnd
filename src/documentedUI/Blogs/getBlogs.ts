export default {
    get:{
        tags: ["Blogs"],
        description: "Get all blogs",
        operationId: "getAllBlogs",
        responses: {
            "200": {
                description: "All blogs retrieved",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Blogs",
                        },
                    },
                },
            },
            "404": {
                description: "Blogs not found",
            },
        },
    },
    }