/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState } from 'react';

import logger from '../../../services/Log';
import { ConfirmModal } from '../../Modals';
import { toastNotification } from '../../../utils/Toast';
import { resetMemories } from '../../../services/Synonyms';
import type { IClearMemoryProps } from '../../../data-structure/Interfaces';
import { NOTIFICATIONS } from '../../../data-structure/Enums';

import './Clear.scss';

const ClearMemory: React.FC<IClearMemoryProps> = ({ setClearMemory }): React.JSX.Element | null => {
  // Define modal state, default set as open
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  // Handle clear memory
  const handleClearMemory = async (): Promise<void> => {
    try {
      // Clear in memory data
      await resetMemories();

      // Notify memory cleared success message
      toastNotification('Memory data cleared successfully!', NOTIFICATIONS.Success);

      // Closes confirm modal window
      // Reset clear memory, reset modal
      handleCloseModal();
    } catch (error) {
      logger(error);
      throw error;
    }
  };

  // Modal will be opened on click clear button
  // Closes confirm modal window
  // Reset clear memory, reset modal
  const handleCloseModal = (): null => {
    setClearMemory(false);
    setModalOpen((prevState) => !prevState);
    return null;
  };

  return (
    <ConfirmModal
      title="Clear Memory Confirmation"
      description="Are you sure you want to clear memory? This action will remove all the words and synonyms from the memory!"
      isOpen={modalOpen}
      onConfirm={handleClearMemory}
      onClose={handleCloseModal}
    />
  );
};

export default ClearMemory;
