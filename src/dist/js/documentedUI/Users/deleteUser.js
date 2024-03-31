"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    delete: {
        tags: ["Users"],
        description: "Delete user",
        operationId: "deleteUser",
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
                description: "User deleted successfullyt",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Users",
                        },
                    },
                },
            },
            "500": {
                description: "Internal server error",
            },
        },
    },
};
