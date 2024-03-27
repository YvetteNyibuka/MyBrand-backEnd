export default {
    get:{
        tags:['Comments'],
        description:'Get all comments attached to the blog using blogId',
        operationId:'getComments',
        security:[
            {
                BearerAuth:[]
            }
        ],
        parameters:[
            {
                name:'id',
                in:'path',
                schema:{
                    type:'string',
                },
                required:true,
            },
        ],
        responses:{
            '200':{
                description:'Comments found',
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Comments',
                        },
                    },
                },
            },
            '500':{
                description:'Internal server error',
            },
        },
    },
    }