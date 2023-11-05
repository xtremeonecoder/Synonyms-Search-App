/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import { type FormEvent } from 'react';
import type Joi from 'joi';

import { validate, validateProparty } from '../validation/Functions';
import type { ChangeHandlerType, SubmissionHandlerType, EventTypes } from '../data-structure/Types';

/**
 * Handles change events for form inputs and validates the input against a Joi schema.
 *
 * @param e - The change event object.
 * @param schema - The Joi schema used for validation.
 * @param doChange - The change handler function to be executed upon successful validation.
 *
 * @returns {void} This function does not return any values; it triggers the provided change handler function.
 */
export const handleChange = (
  e: EventTypes,
  schema: Joi.ObjectSchema<any>,
  doChange: ChangeHandlerType,
): void => {
  // checks data validation
  const error = validateProparty(e, schema);

  // execute callback
  doChange(e, error);
};

/**
 * Handles form submission events, validates the form data against a Joi schema,
 * and executes a submission handler function if the data is valid.
 *
 * @template T - The type of the form data object.
 *
 * @param e - The form submission event object.
 * @param schema - The Joi schema used to define the validation rules for the form data.
 * @param formData - The form data object to be validated and submitted.
 * @param doSubmission - The submission handler function that will be called upon successful validation.
 *
 * @returns {Promise<void>} A promise that resolves when the submission is successful.
 */
export const handleSubmission = async <T>(
  e: FormEvent<HTMLFormElement>,
  schema: Joi.ObjectSchema<any>,
  formData: T,
  doSubmission: SubmissionHandlerType,
): Promise<void> => {
  e.preventDefault();

  // checks data validation
  const errors = validate<T>(formData, schema);

  // execute callback
  await doSubmission(errors);
};
