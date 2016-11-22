import Joi from 'joi';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('uppercase').required(),
    field: Joi.string().allow(''),
    ignore_missing: Joi.bool().required()
  });
}
