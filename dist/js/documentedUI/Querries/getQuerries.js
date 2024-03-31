"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Querries"],
        description: "Get all querries",
        operationId: "getAllQuerries",
        security: [
            {
                BearerAuth: []
            }
        ],
        responses: {
            "200": {
                description: "All querries",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Querries",
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
