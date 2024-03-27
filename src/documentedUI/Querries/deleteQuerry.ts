export default {
    delete:{
        tags: ["Querries"],
        description: "Delete querry",
        operationId: "deleteQuerry",
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
                description: "Querry deleted successfullyt",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Querries",
                        },
                    },
                },
            },
            "404": {
                description: "Querry not found",
            },
            "500": {
                description: "Internal server error",
            },
        },

    },
    }