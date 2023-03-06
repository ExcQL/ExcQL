import React, { useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { TbClipboardCopy } from 'react-icons/tb';

import './Script.css';

const scriptStyle = {
  padding: '2rem',
};

const Script = () => {
  const codeRef = useRef();

  const clickHandler = () => {
    const currentText = codeRef.current.innerText;
    navigator.clipboard.writeText(currentText);
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
          {`Formatted PGSQL script goes here`}
        </SyntaxHighlighter>
        <button className="script__copy-btn">
          <TbClipboardCopy />
        </button>
      </div>
    </div>
  );
};

export default Script;
