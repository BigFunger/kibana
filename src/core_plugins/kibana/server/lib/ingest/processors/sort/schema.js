import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('sort').required(),
    target_field: Joi.string().allow(''),
    sort_order: Joi.string().allow('')
  });
}
