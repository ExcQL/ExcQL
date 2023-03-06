import React, { useState } from 'react';

import { RiFolderUploadFill } from 'react-icons/ri';

import './InfoPanel.css';

const InfoPanel = () => {
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

  return (
    <section className="info-panel">
      <h1 className="info-panel__main-heading">ExcQL</h1>
      <p className="info-panel__description">
        Lorem ipsum, dolor sit amet consectetur adipi sicing elit. Volupta tibus
        aliquid pariatur enim vitae accusantium qua erat cum! Nisi totam
        deserunt labore, aliquam repellat repudiandae perspiciatis explicabo
        pariatur ducimus commo di nihil velit! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Dolor natus volup tate beatae fugit quidem
        accusamus provident nostrum sequi quas!
      </p>
      <form className="info-panel__upload-form" onSubmit={uploadExcelHandler}>
        <label className="upload-form--container">
          <input type="file" id="files" name="files" />
          <RiFolderUploadFill className="info-panel__upload-icon" />
        </label>
        <button type="submit" className="info-panel__upload-btn">
          Upload!
        </button>
      </form>
      {uploadError && (
        <p className="info-panel__error">
          Uh oh! 😭 Upload failed. Please try again.
        </p>
      )}
    </section>
  );
};

export default InfoPanel;
