import Joi from 'joi';
import { base } from '../base/schema';

export const sort = base.keys({
  type_id: Joi.string().only('sort').required(),
  target_field: Joi.string().allow(''),
  sort_order: Joi.string().allow('')
});
