import Joi, {Schema} from 'joi';

const commentSchema: Schema = Joi.object({
    commentMessage: Joi.string().required(),
    blogId: Joi.string().required()
});

const validateComment = (commentData: Record<string, any>) => {
    return commentSchema.validate(commentData);
};

export default validateComment;
