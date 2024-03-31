"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    delete: {
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
            "204": {
                description: "Blog deleted successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Blog",
                        },
                    },
                },
            },
            "404": {
                description: "Blog not found",
            },
            "500": {
                description: "Internal server error",
            },
        },
    },
};
