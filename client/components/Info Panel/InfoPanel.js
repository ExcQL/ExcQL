import React from 'react';

import { RiFolderUploadFill } from 'react-icons/ri';

import './InfoPanel.css';

const InfoPanel = () => {
  const uploadExcelHandler = (e) => {
    e.preventDefault();
    console.log(`File was sent!`);
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
      <form
        action="/test"
        className="info-panel__upload-form"
        onSubmit={uploadExcelHandler}
      >
        <label class="upload-form--container">
          <input type="file" />
          <RiFolderUploadFill className="info-panel__upload-icon" />
        </label>
        <button type="submit" className="info-panel__upload-btn">
          Upload!
        </button>
      </form>
    </section>
  );
};

export default InfoPanel;
