import React from 'react';
import InfoPanel from './Info Panel/InfoPanel';

import './App.css';
import Nav from './Nav/Nav';
import Canvas from './Canvas/Canvas';

const App = () => {
  return (
    <main className="App">
      <InfoPanel />
      <div className="nav-canvas-container">
        <Nav />
        <Canvas />
      </div>
    </main>
  );
};

export default App;
