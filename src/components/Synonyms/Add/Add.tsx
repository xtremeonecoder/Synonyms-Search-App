/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState } from 'react';

import { addSynonyms } from '../../../services/Synonyms';
import { toastNotification } from '../../../utils/Toast';
import { handleChange, handleSubmission } from '../../../form/Handlers';
import { getCreateSynonymsSchema } from '../../../validation/Rules';
import type { ISynonyms } from '../../../data-structure/Interfaces';
import type { EventTypes, TargetElementTypes } from '../../../data-structure/Types';
import { NOTIFICATIONS } from '../../../data-structure/Enums';

import './Add.scss';

const AddSynonyms: React.FC<{
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setModalOpen }): React.JSX.Element => {
  // Define local states
  const [inputData, setInputData] = useState<Partial<ISynonyms>>({});
  const [errorMessages, setErrorMessages] = useState<Partial<Record<keyof ISynonyms, string>>>({});

  // Get synomyms validation schema
  const synonymsSchema = getCreateSynonymsSchema();

  // On change callback
  const doChange = (e: EventTypes, error: string | null): void => {
    if ('target' in e) {
      const target = e.target as TargetElementTypes;

      // Set error message
      setErrorMessages((prevState) => {
        return { ...prevState, [target.name]: error };
      });

      // Set input data
      setInputData((prevState) => {
        return { ...prevState, [target.name]: target.value };
      });
    }
  };

  // On submission callback
  const doSubmission = async (errors: Record<string, string> | null): Promise<void> => {
    // Checks for the null
    if (errors !== null) {
      // Set error message
      setErrorMessages(errors as any);
    } else {
      // Convert string of synonyms to array of synonyms
      const synonymsArray = inputData.synonyms?.split(',').map((synonym) => synonym.trim());

      try {
        // Send add synonyms request
        const response = await addSynonyms({ word: inputData.word, synonyms: synonymsArray });

        // Reset local states
        setInputData({});
        setModalOpen(false);

        // Show toast notification
        toastNotification(response.data.message, NOTIFICATIONS.Success);
      } catch (_) {
        // Error is getting handled by the axios interceptors
      }
    }
  };

  return (
    <div className="add-synonyms">
      <h2>Add Synonyms</h2>
      <form
        id="create-synonyms-form"
        onSubmit={async (e) => {
          await handleSubmission<Partial<ISynonyms>>(e, synonymsSchema, inputData, doSubmission);
        }}
      >
        <div className="form-group">
          <label htmlFor="word">Word to add: </label>
          <input
            type="text"
            id="word"
            name="word"
            placeholder="i.e. Nice"
            onChange={(e) => {
              handleChange(e, synonymsSchema, doChange);
            }}
          />
          <p className="error">{errorMessages.word}</p>
        </div>
        <div className="form-group">
          <label htmlFor="synonyms">Synonyms of above word (comma-separated): </label>
          <input
            type="text"
            id="synonyms"
            name="synonyms"
            placeholder="i.e. Beautiful,Charming,Pretty"
            onChange={(e) => {
              handleChange(e, synonymsSchema, doChange);
            }}
          />
          <p className="error">{errorMessages.synonyms}</p>
        </div>
        <button type="submit">Add Synonyms</button>
      </form>
    </div>
  );
};

export default AddSynonyms;
