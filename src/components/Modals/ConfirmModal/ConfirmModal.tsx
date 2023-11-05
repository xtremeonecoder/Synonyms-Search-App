/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React from 'react';

import { type IModalProps } from '../../../data-structure/Interfaces';

import './ConfirmModal.scss';

const ConfirmModal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  size = 'small',
  title = 'Action Confirmation',
  description = 'Are you sure you want to confirm this action?',
  yesButtonText = 'Yes',
  noButtonText = 'No',
  yesButtonDisabled = false,
}): React.JSX.Element | null => {
  // Return null if isOpen is false
  if (!isOpen) return null;

  // Handle confirm
  const handleConfirm = (): void => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <div className="confirm-modal-overlay">
      <div className={size}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          {!yesButtonDisabled && (
            <button onClick={handleConfirm} className="button-action">
              {yesButtonText}
            </button>
          )}
          <button onClick={onClose} className="button-action">
            {noButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
