import React, { useState } from 'react';

import { RiFolderUploadFill } from 'react-icons/ri';

import './InfoPanel.css';

const createMappingTemplate = (id) => {
  return { mappingId: id, fileColumn: '', tableName: '' }
};

const initialMappingState = {
  mapping: [...Array(3).keys()].map(num => createMappingTemplate(num)),
  nextMappingId: 3,
};

const InfoPanel = () => {
  const [mappingState, setMappingState] = useState(initialMappingState);
  const [uploadError, setUploadError] = useState(false);

  const uploadExcelHandler = async (e) => {
    try {
      e.preventDefault();

      const files = e.target.files.files;
      const excelFile = new FormData();
      excelFile.append('excel', files[0]);
      //ADDED FOR EXTRA INFO PURPOSES
      excelFile.append('document', JSON.stringify({ People: 'B9' }));

      //SPECIFIC BACKEND ENDPOINT NEEDED TO MAKE PASSING REQUEST
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          method: 'POST',
          body: excelFile,
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      setUploadError(true);
    }
  };

  const handleUploadFile = (event) => {
    const fileNameElement = document.getElementById('file-name');
    fileNameElement.innerHTML = event.target.files[0].name;
  }

  const handleInputChange = (event) => {
    const newMapping = [...mappingState.mapping];
    newMapping.forEach(record => {
      if (record.mappingId === Number(event.target.id)) {
        record[event.target.name] = event.target.value;
      }
    })
    setMappingState({ ...mappingState, mapping: newMapping });
  }

  const handleMoreInputClick = (event) => {
    event.preventDefault();
    const newId = mappingState.nextMappingId + 1;
    setMappingState({ ...mappingState, mapping: [...mappingState.mapping, createMappingTemplate(newId)], nextMappingId: newId });
  }

  console.log(mappingState);
  return (
    <section className="info-panel">
      <h1 className="info-panel__main-heading">ExcQL</h1>
      <p className="info-panel__description">
        Translating excel files to SQL script is as easy as 1, 2, 3!
      </p>
      <form className="info-panel__upload-form" onSubmit={uploadExcelHandler}>
        <span className="info-panel__steps">
          Step 1: Upload your file
        </span>
        <div className="upload-form--container">
          <input type="file" id="files" name="files" accept=".xls, .xlsx" onChange={handleUploadFile} />
          <RiFolderUploadFill className="info-panel__upload-icon" />
          <span id='file-name'></span>
        </div>
        <span className="info-panel__steps">
          Step 2: Declare file columns to SQL tables mapping
        </span>
        <p className="info-panel__instructions">
          How would you like your information to split into separate tables?
          Open your file in Excel. Put in the column letter that corresponds to the start of a table
          under "Column Letter", and then input a table name of your choice under "Table Name" in the same row.
        </p>
        <div className="mapping-input--container">
          <header>
            <span>Column Letter</span>
            <span>Table Name</span>
          </header>
          {mappingState.mapping.map(record =>
            <MappingInput key={record.mappingId} id={record.mappingId} handleInputChange={handleInputChange} />
          )
          }
          <button id='more-inputs' onClick={handleMoreInputClick}>Add More</button>
        </div>
        <span className="info-panel__steps">
          Step 3: Upload the file and watch magic happen!
        </span>
        <div className="upload-form--container">
          <button type="submit" className="info-panel__upload-btn">
            Upload!
          </button>
        </div>
      </form>
      {uploadError && (
        <p className="info-panel__error">
          Uh oh! 😭 Upload failed. Please try again.
        </p>
      )}
    </section>
  );
};

const MappingInput = (props) => {
  const { id, handleInputChange } = props;
  return (
    <div className='input-container'>
      <input id={id} name='fileColumn' type='text' onChange={handleInputChange} />
      <input id={id} name='tableName' type='text' onChange={handleInputChange} />
    </div>
  );
}

export default InfoPanel;
