import Joi, { Schema } from 'joi';

const querrySchema: Schema = Joi.object({
  fullNames: Joi.string().required(),
  email: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

const ValidateQuerry = (querryData: Record<string, any>) => {
  return querrySchema.validate(querryData);
};

export default ValidateQuerry;
