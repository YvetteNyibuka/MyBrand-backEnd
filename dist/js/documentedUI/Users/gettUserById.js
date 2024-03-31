"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Users'],
        description: 'Get Single user',
        operationId: 'getSingleUser',
        security: [
            {
                BearerAuth: []
            }
        ],
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    type: 'string',
                },
                required: true,
            },
        ],
        responses: {
            '200': {
                description: 'User found',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Users',
                        },
                    },
                },
            },
            '404': {
                description: 'User not found',
            },
            '500': {
                description: 'Internal server error',
            },
        },
    },
};
