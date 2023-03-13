import React, { useContext, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { TbClipboardCopy } from 'react-icons/tb';
import store from '../../context/store';

import './Script.css';

const scriptStyle = {
  padding: '3rem 5rem 3rem 3rem',
  height: '60vh',
  overflowY: 'scroll',
};

const Script = ({ activeTab }) => {
  const codeRef = useRef();
  const copiedRef = useRef();
  const { uploadedData } = useContext(store);

  const clickHandler = () => {
    const currentText = codeRef.current.innerText;
    navigator.clipboard.writeText(currentText);
    copiedRef.current.style.visibility = 'visible';
    copiedRef.current.style.opacity = '1';
    setTimeout(() => {
      copiedRef.current.style.visibility = 'hidden';
      copiedRef.current.style.opacity = 0;
    }, 1000);
  };

  return (
    <div className={`script ${activeTab === `script` ? `active-script` : ``}`}>
      <div className='script__script-container' ref={codeRef}>
        <SyntaxHighlighter
          language='pgsql'
          style={docco}
          wrapLongLines={true}
          customStyle={scriptStyle}
        >
          {uploadedData === null
            ? 'Upload a file and we will generate the script for you!'
            : uploadedData.script}
        </SyntaxHighlighter>
        <button className='script__copy-btn' onClick={clickHandler}>
          <TbClipboardCopy />
        </button>
        <span ref={copiedRef} className='script__copied-text'>
          Copied!
        </span>
      </div>
    </div>
  );
};

export default Script;
