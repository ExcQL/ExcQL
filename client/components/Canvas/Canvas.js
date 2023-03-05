import React from 'react';

import './Canvas.css';
import Diagram from './Diagram/Diagram';
import Script from './Script/Script';

const Canvas = ({ activeTab }) => {
  console.log(activeTab);

  return (
    <section className="canvas">
      {/* {activeTab === `script` ? <Script /> : <Diagram />} */}
    </section>
  );
};

export default Canvas;
