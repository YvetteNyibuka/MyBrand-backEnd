"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    patch: {
        tags: ['Users'],
        description: 'Update user by id',
        operationId: 'updateUser',
        security: [
            {
                BearerAuth: [],
            },
        ],
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Id of user to update',
                schema: {
                    type: 'string',
                },
            },
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            names: { type: 'string', example: 'Yvette' }
                        }
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'User updated successfully',
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
