import React, { useContext, useState } from 'react';

import { RiFolderUploadFill } from 'react-icons/ri';

import './InfoPanel.css';
import store from '../context/store';

const createMappingTemplate = (id) => {
  return { mappingId: id, tableName: '', fileColumn: '' };
};

const initialMappingState = {
  mapping: [...Array(3).keys()].map((num) => createMappingTemplate(num)),
  nextMappingId: 3,
};

export const sortExcelColumnLetters = (array) => {
  return array.sort((objA, objB) => {
    const objAValues = Object.values(objA);
    const objBValues = Object.values(objB);
    const isCorrectFormat =
      objAValues.length === 1 &&
      objBValues.length === 1 &&
      typeof objAValues[0] === 'string' &&
      typeof objBValues[0] === 'string';
    if (!isCorrectFormat)
      throw new Error(
        'Column letter not in correct format (expected "string").'
      );
    const a = objAValues[0];
    const b = objBValues[0];
    if (a === b) throw new Error('No duplicate column letters allowed.');
    const lengthA = a.length;
    const lengthB = b.length;
    if (lengthA < lengthB || (a.length === b.length && a < b)) return -1;
    return 1;
  });
};

export const sortTableToColumnMappingInput = (mapping) => {
  const columnToTableArray = mapping.reduce(
    (outputObj, { tableName, fileColumn }) => {
      if (tableName !== '' && fileColumn !== '') {
        if (outputObj.map((obj) => Object.keys(obj)[0]).includes(tableName))
          throw new Error('Duplicate table name found');
        const mapping = {};
        mapping[tableName] = fileColumn;
        outputObj.push(mapping);
      }
      return outputObj;
    },
    []
  );
  return Object.assign({}, ...sortExcelColumnLetters(columnToTableArray));
};

const InfoPanel = () => {
  const [mappingState, setMappingState] = useState(initialMappingState);
  const [uploadError, setUploadError] = useState(false);
  const ctx = useContext(store);

  const uploadExcelHandler = async (e) => {
    try {
      e.preventDefault();
      const files = e.target.files.files;
      if (files.length === 0) throw new Error('No file uploaded.');
      const excelFile = new FormData();
      excelFile.append('excel', files[0]);
      excelFile.append(
        'document',
        JSON.stringify(sortTableToColumnMappingInput(mappingState.mapping))
      );
      //SPECIFIC BACKEND ENDPOINT NEEDED TO MAKE PASSING REQUEST
      //TODO: Need to change fetch request URL
      const response = await fetch(`/api`, {
        method: 'POST',
        body: excelFile,
      });
      const data = await response.json();
      console.log(data);
      ctx.updateData(data);
      if (uploadError) setUploadError(false);
    } catch (error) {
      console.error(error);
      setUploadError(true);
    }
  };

  const handleUploadFile = (event) => {
    const fileNameElement = document.getElementById('file-name');
    fileNameElement.innerHTML = event.target.files[0].name;
  };

  const handleInputChange = (event) => {
    const newMapping = [...mappingState.mapping];
    newMapping.forEach((record) => {
      if (record.mappingId === Number(event.target.id)) {
        record[event.target.name] = event.target.value;
      }
    });
    setMappingState({ ...mappingState, mapping: newMapping });
  };

  const handleMoreInputClick = (event) => {
    event.preventDefault();
    const newId = mappingState.nextMappingId + 1;
    setMappingState({
      ...mappingState,
      mapping: [...mappingState.mapping, createMappingTemplate(newId)],
      nextMappingId: newId,
    });
  };

  return (
    <section className='info-panel'>
      <h1 className='info-panel__main-heading'>ExcQL</h1>
      <p className='info-panel__description'>
        Translating excel files to SQL script is as easy as 1, 2, 3!
      </p>
      <form className='info-panel__upload-form' onSubmit={uploadExcelHandler}>
        <span className='info-panel__steps'>
          <strong>Step 1:</strong> Upload your file
        </span>
        <label className='upload-form--container'>
          <input
            type='file'
            id='files'
            name='files'
            accept='.xls, .xlsx'
            onChange={handleUploadFile}
          />
          <RiFolderUploadFill className='info-panel__upload-icon' />
          <span id='file-name'></span>
        </label>
        <span className='info-panel__steps'>
          <strong>Step 2:</strong> Declare file columns to SQL tables mapping
        </span>
        <p className='info-panel__instructions'>
          How would you like your information to split into separate tables?
          Open your file in Excel. Put in the column letter that corresponds to
          the start of a table under "Column Letter", and then input a table
          name of your choice under "Table Name" in the same row.
          <br />
          <b>
            The content included in the table is assumed between the columns
            stated from left to right. Only complete sets of table to column
            mappings are considered.
          </b>
        </p>
        <div className='mapping-input--container'>
          <header>
            <span>Table Name</span>
            <span>Column Letter</span>
          </header>
          {mappingState.mapping.map((record) => (
            <MappingInput
              key={record.mappingId}
              id={record.mappingId}
              handleInputChange={handleInputChange}
            />
          ))}
          <button id='more-inputs' onClick={handleMoreInputClick}>
            Add More
          </button>
        </div>
        <span className='info-panel__steps'>
          <strong>Step 3:</strong> Upload the file and watch magic happen!
        </span>
        <div>
          {uploadError && (
            <p className='info-panel__error'>
              Uh oh! 😭 Upload failed. Please try again.
            </p>
          )}
        </div>
        <div className='upload-form--container'>
          <button type='submit' className='info-panel__upload-btn'>
            Upload!
          </button>
        </div>
      </form>
    </section>
  );
};

const MappingInput = (props) => {
  const { id, handleInputChange } = props;
  return (
    <div className='input-container'>
      <input
        id={id}
        name='tableName'
        type='text'
        onChange={handleInputChange}
        required={id === 0}
      />
      <input
        id={id}
        name='fileColumn'
        type='text'
        onChange={handleInputChange}
        required={id === 0}
      />
    </div>
  );
};

export default InfoPanel;
