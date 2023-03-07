import React, { useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { TbClipboardCopy } from 'react-icons/tb';
import { DUMMY_SQL_SCRIPT } from '../../../assets/sqlScriptDummyData';

import './Script.css';

const scriptStyle = {
  padding: '2rem',
};

const Script = () => {
  const codeRef = useRef();
  const copiedRef = useRef();

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
    <div className="script">
      <div
        className="script__script-container"
        onClick={clickHandler}
        ref={codeRef}
      >
        <SyntaxHighlighter
          language="pgsql"
          style={docco}
          wrapLongLines={true}
          customStyle={scriptStyle}
        >
          {DUMMY_SQL_SCRIPT}
        </SyntaxHighlighter>
        <button className="script__copy-btn">
          <TbClipboardCopy />
        </button>
        <span ref={copiedRef} className="script__copied-text">Copied!</span>
      </div>
    </div>
  );
};

export default Script;
