import Joi, { Schema } from 'joi';

const userSchema: Schema = Joi.object({
  names: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateUser = (userData: Record<string, any>) => {
  return userSchema.validate(userData);
};

export default validateUser;
