import _ from 'lodash';
import Joi from 'joi';
import * as ingestProcessorSchemas from '../schemas';

export const base = Joi.object({
  processor_id: Joi.string().required(),
  ignore_failure: Joi.string().allow(''),
  processors: Joi.array().items(_.values(ingestProcessorSchemas))
});
