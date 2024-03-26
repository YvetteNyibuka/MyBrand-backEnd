export default {
    delete:{
        tags: ["Blogs"],
        description: "Delete blog",
        operationId: "deleteBlog",
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
        responses: {
            "200": {
                description: "No content",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Blog",
                        },
                    },
                },
            },
            "404": {
                description: "Blog was not found",
            },
        },

    },
    }