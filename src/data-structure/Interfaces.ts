/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import type React from 'react';

import { type MODAL_SIZE } from './Enums';

export interface IModalProps {
  size?: MODAL_SIZE; // small, medium, large, xlarge
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  yesButtonText?: string;
  noButtonText?: string;
  yesButtonDisabled?: boolean;
}

export interface ISynonyms {
  word: string;
  synonyms: string;
}

export interface IClearMemoryProps {
  setClearMemory: React.Dispatch<React.SetStateAction<boolean>>;
}
