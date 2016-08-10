import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('fail').required(),
    message: Joi.string().allow('')
  });
}
