/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import type { AxiosResponse } from 'axios';

import http from './Http';

const apiEndPoint = `${process.env.REACT_APP_API_URL}/synonyms`;

/**
 * Retrieves synonyms for a given word from the server.
 *
 * @param {string} word - The word for which synonyms are requested.
 * @returns {Promise<AxiosResponse<any, any>>} A Promise that resolves with the AxiosResponse from the server.
 */
export async function getSynonyms(word: string): Promise<AxiosResponse<any, any>> {
  return await http.get(`${apiEndPoint}/${word}`);
}

/**
 * Adds synonyms data to the server.
 *
 * @param {any} data - The data to be added to the server.
 * @returns {Promise<AxiosResponse<any, any>>} A Promise that resolves with the AxiosResponse from the server.
 */
export async function addSynonyms(data: any): Promise<AxiosResponse<any, any>> {
  return await http.post(apiEndPoint, data);
}

/**
 * Resets server memories or data.
 *
 * @returns {Promise<AxiosResponse<any, any>>} A Promise that resolves with the AxiosResponse from the server.
 */
export async function resetMemories(): Promise<AxiosResponse<any, any>> {
  return await http.get(`${apiEndPoint}/reset/memories`);
}
