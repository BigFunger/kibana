import _ from 'lodash';
import Joi from 'joi';
//import * as ingestProcessorSchemas from '../schemas';
import processorArraySchema from '../processor_array/schema';

export const base = Joi.object({
  processor_id: Joi.string().required(),
  failure_action: Joi.string().allow(''),
  failure_processors: processorArraySchema
  //failure_processors: Joi.array().items(_.values(ingestProcessorSchemas))
});
