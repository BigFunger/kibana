import Joi from 'joi';
import { base } from '../base/schema';

export const date = base.keys({
  type_id: Joi.string().only('date_index_name').required(),
  source_field: Joi.string().allow(''),
  date_rounding: Joi.string().allow(''),
  index_name_prefix: Joi.string().allow(''),
  date_formats: Joi.array().items(Joi.string().allow('')),
  timezone: Joi.string().allow(''),
  locale: Joi.string().allow(''),
  index_name_format: Joi.string().allow('')
});
