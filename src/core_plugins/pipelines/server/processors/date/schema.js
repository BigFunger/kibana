import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('date').required(),
    field: Joi.string().allow(''),
    target_field: Joi.string().allow(''),
    formats: Joi.array().items(Joi.string().allow('')),
    timezone: Joi.string().allow(''),
    locale: Joi.string().allow('')
  });
}
