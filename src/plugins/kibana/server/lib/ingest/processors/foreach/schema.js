import _ from 'lodash';
import Joi from 'joi';
import { base } from '../base/schema';
import processorArraySchema from '../processor_array/schema';
//import * as ingestProcessorSchemas from '../schemas';

export const foreach = base.keys({
  type_id: Joi.string().only('foreach').required(),
  target_field: Joi.string().allow(''),
  processors: processorArraySchema
  //processors: Joi.array().items(_.values(ingestProcessorSchemas))
});
