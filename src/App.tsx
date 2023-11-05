/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Modal } from './components/Modals';
import { AddSynonyms, LookupSynonyms, ClearMemory } from './components/Synonyms';
import { MODAL_SIZE } from './data-structure/Enums';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App(): React.JSX.Element {
  // Initially modal will be closed
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clearMemory, setClearMemory] = useState<boolean>(false);

  const handleCloseModal = (): null => {
    setModalOpen((prevState) => !prevState);
    return null;
  };

  return (
    <div className="App">
      <h1>Synonym Search Tool</h1>
      <button
        data-testid="add-button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add Word
      </button>
      <button
        data-testid="clear-button"
        onClick={() => {
          setClearMemory(true);
        }}
      >
        Clear Memory
      </button>
      <ToastContainer />
      {clearMemory && <ClearMemory setClearMemory={setClearMemory} />}
      <Modal isOpen={modalOpen} size={MODAL_SIZE.MEDIUM} onClose={handleCloseModal}>
        <AddSynonyms setModalOpen={setModalOpen} />
      </Modal>
      <LookupSynonyms />
    </div>
  );
}

export default App;
