import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.kibana.ingest.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('script').required(),
    target_field: Joi.string().allow(''),
    language: Joi.string().allow(''),
    filename: Joi.string().allow(''),
    script_id: Joi.string().allow(''),
    inline_script: Joi.string().allow('')
  });
}
