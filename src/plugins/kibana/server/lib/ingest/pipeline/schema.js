import _ from 'lodash';
import Joi from 'joi';
import processorArraySchema from '../processors/processor_array/schema';

export default Joi.object({
  pipeline_id: Joi.string().allow(''),
  description: Joi.string().allow(''),
  failure_action: Joi.string().allow(''),
  failure_processors: processorArraySchema.optional(),
  processors: processorArraySchema
});
