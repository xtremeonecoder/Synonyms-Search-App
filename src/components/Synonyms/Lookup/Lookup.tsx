/**
 * Synonyms Search Tool
 *
 * @category   Application_Frontend
 * @package    synonym-search-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState } from 'react';

import { getSynonyms } from '../../../services/Synonyms';
import { handleChange, handleSubmission } from '../../../form/Handlers';
import { getSearchSynonymsSchema } from '../../../validation/Rules';
import type { ISynonyms } from '../../../data-structure/Interfaces';
import type { EventTypes, TargetElementTypes } from '../../../data-structure/Types';

import './Lookup.scss';

const LookupSynonyms: React.FC = (): React.JSX.Element => {
  // Define local states
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [inputData, setInputData] = useState<Partial<ISynonyms>>({});
  const [errorMessages, setErrorMessages] = useState<Partial<Record<keyof ISynonyms, string>>>({});

  // Get synomyms validation schema
  const synonymsSchema = getSearchSynonymsSchema();

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
      try {
        // Fetch synonyms for requested word
        const response = await getSynonyms(inputData.word as string);

        // Set fetched synonyms in local state
        setSynonyms(response.data.synonyms);
      } catch (_) {
        // Error is getting handled by the axios interceptors
      }
    }
  };

  const searchSynonymsOnClick = async (synonym: string): Promise<void> => {
    try {
      // Fetch synonyms for requested word
      const response = await getSynonyms(synonym);

      // Set as search word
      setInputData({ word: synonym });

      // Set fetched synonyms in local state
      setSynonyms(response.data.synonyms);
    } catch (_) {
      // Error is getting handled by the axios interceptors
    }
  };

  return (
    <div className="search-synonyms">
      <h2>Lookup Synonyms</h2>
      <form
        id="search-synonyms-form"
        onSubmit={async (e) => {
          await handleSubmission<Partial<ISynonyms>>(e, synonymsSchema, inputData, doSubmission);
        }}
      >
        <div className="form-group">
          <label htmlFor="word">Word for search: </label>
          <input
            type="text"
            id="word"
            name="word"
            placeholder="i.e. Nice"
            value={inputData.word}
            onChange={(e) => {
              handleChange(e, synonymsSchema, doChange);
            }}
          />
          <p className="error">{errorMessages.word}</p>
        </div>
        <button type="submit">Lookup Synonyms</button>
      </form>
      {synonyms.length > 0 ? (
        <div data-testid="result-pan">
          <div>
            <strong>Synonyms:</strong>
            <div>
              {synonyms.map((synonym) => {
                return (
                  <span key={synonym}>
                    <a
                      onClick={async () => {
                        await searchSynonymsOnClick(synonym);
                      }}
                    >
                      {synonym}
                    </a>
                    {', '}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div data-testid="result-pan">
          <strong>Synonyms:</strong>
          <div>Sorry, no synonyms found for the given word!</div>
        </div>
      )}
    </div>
  );
};

export default LookupSynonyms;
