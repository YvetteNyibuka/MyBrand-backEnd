import Joi, { Schema } from 'joi';

const userSchema: Schema = Joi.object({
  names: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
});

const validateUser = (userData: Record<string, any>) => {
  return userSchema.validate(userData);
};

export default validateUser;
