import Joi, { Schema } from 'joi';

const userSchema: Schema = Joi.object({
  names: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(5).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,30}$'))
  .message('"{#label}" must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),
  role: Joi.string()
});

const validateUser = (userData: Record<string, any>) => {
  return userSchema.validate(userData);
};

export default validateUser;
