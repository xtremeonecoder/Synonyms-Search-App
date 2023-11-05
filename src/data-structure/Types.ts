/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import { type NOTIFICATIONS } from './Enums';

export type NotificationTypes =
  | NOTIFICATIONS.Info
  | NOTIFICATIONS.Error
  | NOTIFICATIONS.Success
  | NOTIFICATIONS.Warning;

export type ChangeHandlerType = (e: EventTypes, error: string | null) => void;

export type SubmissionHandlerType = (error: Record<string, string> | null) => Promise<void>;

export type EventTypes =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLButtonElement>
  | Event;

export type FormElementTypes = HTMLInputElement | HTMLButtonElement;

export type TargetElementTypes = HTMLInputElement | HTMLButtonElement;
