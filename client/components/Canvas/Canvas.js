import React from 'react';

import './Canvas.css';
import Diagram from './Diagram/Diagram';
import Script from './Script/Script';
import DUMMY_DATA from '../../assets/CanvasDiagramMummyData';

const Canvas = ({ activeTab }) => {
  return (
    <section className="canvas">
      {activeTab === `script` ? <Script /> : <Diagram tables={DUMMY_DATA} />}
    </section>
  );
};

export default Canvas;
