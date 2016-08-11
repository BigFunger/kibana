import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.kibana.ingest.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('convert').required(),
    source_field: Joi.string().allow(''),
    target_field: Joi.string().allow(''),
    type: Joi.string()
  });
}
