import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('convert').required(),
    source_field: Joi.string().allow(''),
    target_field: Joi.string().allow(''),
    type: Joi.string()
  });
}
