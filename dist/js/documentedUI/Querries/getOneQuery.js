"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ['Querries'],
        description: 'Get Single querry',
        operationId: 'getSingleQuerry',
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
                description: 'Querry found',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Querries',
                        },
                    },
                },
            },
            '404': {
                description: 'Querry not found',
            },
            '500': {
                description: 'Internal server error',
            },
        },
    },
};
