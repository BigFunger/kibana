import Joi from 'joi';
import processorArraySchema from '../../lib/processor_array/schema';

export default function (server) {
  const baseSchema = server.plugins.pipelines.processors.baseSchema;

  return baseSchema.keys({
    type_id: Joi.string().only('foreach').required(),
    field: Joi.string().allow(''),
    processors: processorArraySchema
  });
}
