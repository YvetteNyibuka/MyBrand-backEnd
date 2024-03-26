export default {
    get:{
        tags: ["Querries"],
        description: "Get all querries",
        operationId: "getAllQuerries",
        security:[
            {
                BearerAuth:[]
            }
        ],
        responses: {
            "200": {
                description: "All Querries retrieved",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Querries",
                        },
                    },
                },
            },
            "404": {
                description: "Querries were not found",
            },
        },
    },
    }