/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import Joi from 'joi';

// Create synonyms validation rules
export const getCreateSynonymsSchema = (): Joi.ObjectSchema<any> =>
  Joi.object({
    word: Joi.string().required().label('Word'),
    synonyms: Joi.string().required().label('Synomyms'),
  });

// Search synonyms validation rules
export const getSearchSynonymsSchema = (): Joi.ObjectSchema<any> =>
  Joi.object({
    word: Joi.string().required().label('Word'),
  });
