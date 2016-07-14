import Joi from 'joi';
import { base } from '../base/schema';

export const fail = base.keys({
  type_id: Joi.string().only('fail').required(),
  message: Joi.string().allow('')
});
