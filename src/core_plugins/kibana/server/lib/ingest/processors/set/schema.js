import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.kibana.ingest.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('set').required(),
    target_field: Joi.string().allow(''),
    value: Joi.string().allow('')
  });
}
