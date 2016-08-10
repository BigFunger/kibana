import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('gsub').required(),
    source_field: Joi.string().allow(''),
    pattern: Joi.string().allow(''),
    replacement: Joi.string().allow('')
  });
}
