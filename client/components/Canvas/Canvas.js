import React from 'react';
import { useContext } from 'react';

import './Canvas.css';
import Diagram from './Diagram/Diagram';
import Script from './Script/Script';
import DUMMY_DATA from '../../assets/CanvasDiagramMummyData';
import store from '../context/store';

const Canvas = ({ activeTab }) => {
  const ctx = useContext(store);
  // console.log(ctx.uploadedData);

  return (
    <section className="canvas">
      {/* SWITCHING BETWEEN MOUNTING AND UNMOUNTING */}
      {/* {activeTab === `script` ? <Script /> : <Diagram tables={DUMMY_DATA} />} */}
      {/* SWITCHING BETWEEN DISPLAYING AND NOT DISPLAYING */}
      <Script activeTab={activeTab} />
      <Diagram tables={DUMMY_DATA} activeTab={activeTab} />
      {/* {activeTab === `script` ? (
        <Script />
      ) : (
        <Diagram tables={ctx.uploadedData} />
      )} */}
    </section>
  );
};

export default Canvas;
