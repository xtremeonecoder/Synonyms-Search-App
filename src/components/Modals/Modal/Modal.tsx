/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React from 'react';

import type { IModalProps } from '../../../data-structure/Interfaces';

import './Modal.scss';

const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  children,
  size,
}): React.JSX.Element | null => {
  // Return null if isOpen is false
  if (!isOpen) return null;

  // Handle
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className={size}>
        <button onClick={handleCloseModal}>x</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
