import React, { useEffect, useState } from 'react';

import './Nav.css';

const Nav = ({ tabHandler }) => {
  const [scriptActiveTab, setScriptActiveTab] = useState(false);

  const scriptClickHandler = () => {
    setScriptActiveTab(true);
  };

  const diagramClickHandler = () => {
    setScriptActiveTab(false);
  };

  useEffect(() => {
    tabHandler(scriptActiveTab);
  }, [scriptActiveTab]);

  return (
    <nav className="nav">
      <h3
        className={`nav__script ${scriptActiveTab && `nav__active-tab`}`}
        onClick={scriptClickHandler}
      >
        Script
      </h3>
      <h3
        className={`nav__diagram ${!scriptActiveTab && `nav__active-tab`}`}
        onClick={diagramClickHandler}
      >
        ER Diagram
      </h3>
    </nav>
  );
};

export default Nav;
