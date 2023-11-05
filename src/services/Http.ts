/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import logger from './Log';
import { toastNotification } from '../utils/Toast';
import { NOTIFICATIONS } from '../data-structure/Enums';

// Custom axios configuration
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'no-token-specified',
  },
});

// Catch unexpected request errors
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // Do something before request is sent
    return config;
  },
  async (error: unknown) => {
    // Do something with request error
    return await Promise.reject(error);
  },
);

// Catch unexpected response errors
instance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    // For status code 2xx
    // Do something with response data
    return response;
  },
  async (error: any) => {
    // Evaluate if it is expected error?
    const expectedException =
      error?.response && error.response.status >= 400 && error.response.status < 500;

    // Formulate error message
    let errorMessage = `${error.message}!`;
    if (error?.response?.data) {
      if (typeof error.response.data === 'string') {
        errorMessage += '\n' + error.response.data;
      }
      if (typeof error.response.data.message === 'string') {
        errorMessage += '\n' + error.response.data.message;
      }
      if (typeof error.response.data.error === 'string') {
        errorMessage += '\n' + error.response.data.error;
      }
    }

    // Notify and log error message
    logger(error);
    if (expectedException) {
      toastNotification('Error: ' + errorMessage, NOTIFICATIONS.Error);
    } else {
      toastNotification('Unexpected Error: ' + errorMessage, NOTIFICATIONS.Error);
    }

    // Reject promise with error
    return await Promise.reject(error);
  },
);

export default {
  get: instance.get,
  post: instance.post,
};
