import Joi from 'joi';

export default function (baseSchema) {
  return baseSchema.keys({
    type_id: Joi.string().only('append').required(),
    target_field: Joi.string().allow(''),
    values: Joi.array().items(Joi.string().allow(''))
  });
}
