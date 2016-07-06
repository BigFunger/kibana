import _ from 'lodash';
import Joi from 'joi';
import * as ingestProcessorSchemas from '../processors/schemas';
import processorArraySchema from '../processors/processor_array/schema';

export default Joi.object({
  pipeline_id: Joi.string().allow(''),
  description: Joi.string().allow(''),
  failure_action: Joi.string().allow(''),
  failure_processors: processorArraySchema.optional(),
  processors: processorArraySchema
  //failure_processors: Joi.array().items(_.values(ingestProcessorSchemas)).optional(),
  //processors: Joi.array().items(_.values(ingestProcessorSchemas))
});
