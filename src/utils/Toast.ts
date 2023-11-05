/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import { toast, type ToastOptions, type ToastContent } from 'react-toastify';

import { type NotificationTypes } from '../data-structure/Types';

const toastConfig: ToastOptions<Record<string, unknown>> | undefined = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: 'light',
};

export const toastNotification = (alert: ToastContent<string>, type: NotificationTypes): void => {
  toast[type](alert, toastConfig);
};
