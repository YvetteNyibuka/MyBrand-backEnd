"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Users"],
        description: "Get all users",
        operationId: "getAllUsers",
        security: [
            {
                BearerAuth: []
            }
        ],
        responses: {
            "200": {
                description: "All users registered",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Users",
                        },
                    },
                },
            },
            "404": {
                description: "No users found",
            },
            "500": {
                description: "Internal server error",
            },
        },
    },
};
