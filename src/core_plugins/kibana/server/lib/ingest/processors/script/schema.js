import Joi from 'joi';
import { base } from '../base/schema';

export const script = base.keys({
  type_id: Joi.string().only('script').required(),
  target_field: Joi.string().allow(''),
  language: Joi.string().allow(''),
  filename: Joi.string().allow(''),
  script_id: Joi.string().allow(''),
  inline_script: Joi.string().allow('')
});
