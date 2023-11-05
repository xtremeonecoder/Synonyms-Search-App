/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import Joi from 'joi';

import type { EventTypes, TargetElementTypes } from '../data-structure/Types';

// single input validation (on change)
export const validateProparty = (e: EventTypes, schema: Joi.ObjectSchema<any>): string | null => {
  try {
    if ('target' in e) {
      const target = e.target as TargetElementTypes;

      if (target.type === 'checkbox') {
        Joi.attempt(target.value, schema.extract(target.name));
      } else if (['text', 'number', 'email'].includes(target.type)) {
        Joi.attempt(target.value, schema.extract(target.name));
      } else {
        Joi.attempt(target.value, schema.extract(target.name));
      }
    }
  } catch (error: any) {
    return error !== undefined ? error.details[0].message : null;
  }

  return null;
};

// all input validation (on submission)
export const validate = <T>(
  formData: T,
  schema: Joi.ObjectSchema<any>,
): Record<string, string> | null => {
  // using Joi validation
  const options = { abortEarly: false };
  const { error } = schema.validate(formData, options);

  if (error === undefined) return null;

  const errors: Record<string, string> = {};

  // store errors
  error.details.map((err: Joi.ValidationErrorItem) => {
    errors[err.context?.key as string] = err.message;
    return errors;
  });

  return errors;
};
