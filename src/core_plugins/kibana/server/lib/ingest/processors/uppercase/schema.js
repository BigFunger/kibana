import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('uppercase').required(),
    source_field: Joi.string().allow('')
  });
}
