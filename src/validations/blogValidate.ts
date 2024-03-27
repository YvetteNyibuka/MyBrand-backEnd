import Joi, { Schema } from 'joi';

const blogSchema: Schema = Joi.object({
  category: Joi.string().required(),
  author: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  coverImage: Joi.string()
});

const validateBlog = (blogData: Record<string, any>) => {
  return blogSchema.validate(blogData);
};

export default validateBlog;
