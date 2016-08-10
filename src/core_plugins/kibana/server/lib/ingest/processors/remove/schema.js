import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('remove').required(),
    source_field: Joi.string().allow('')
  });
}
