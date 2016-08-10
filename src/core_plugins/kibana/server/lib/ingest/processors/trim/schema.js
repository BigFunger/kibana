import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('trim').required(),
    source_field: Joi.string().allow('')
  });
}
