import React, { useState } from 'react';
import InfoPanel from './Info Panel/InfoPanel';

import './App.css';
import Nav from './Nav/Nav';
import Canvas from './Canvas/Canvas';

const App = () => {
  const [currentTab, setCurrentTab] = useState('');

  const currentTabHandler = (currentTabIsScript) => {
    currentTabIsScript ? setCurrentTab(`script`) : setCurrentTab(`diagram`);
  };

  return (
    <main className="App">
      <InfoPanel />
      <div className="nav-canvas-container">
        <Nav tabHandler={currentTabHandler} />
        <Canvas activeTab={currentTab} />
      </div>
    </main>
  );
};

export default App;
