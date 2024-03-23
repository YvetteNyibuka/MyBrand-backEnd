import Joi, { Schema } from 'joi';

const querrySchema: Schema = Joi.object({
  fullNames: Joi.string().required(),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  subject: Joi.string().required(),
  message: Joi.string().required().min(10),
});

const ValidateQuerry = (querryData: Record<string, any>) => {
  return querrySchema.validate(querryData);
};

export default ValidateQuerry;
