import _ from 'lodash';
import Joi from 'joi';
import * as ingestProcessorSchemas from '../schemas';

export const processorArray = Joi.array().items(_.values(ingestProcessorSchemas));
