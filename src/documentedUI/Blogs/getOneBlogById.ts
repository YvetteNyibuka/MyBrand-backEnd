export default {
    get:{
        tags:['Blogs'],
        description:'Get Single blog',
        operationId:'getSingleBlog',
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
                description:'Get Single Blog',
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Blog',
                        },
                    },
                },
            },
            '404':{
                description:'User was not found',
            },
        },
    },
    }