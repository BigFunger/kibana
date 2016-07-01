import _ from 'lodash';
import Joi from 'joi';
import * as ingestProcessorSchemas from '../processors/schemas';

export default Joi.object({
  pipeline_id: Joi.string().allow(''),
  description: Joi.string().allow(''),
  failure_action: Joi.string().allow(''),
  failure_processors: Joi.array().items(_.values(ingestProcessorSchemas)).optional(),
  processors: Joi.array().items(_.values(ingestProcessorSchemas))
});
