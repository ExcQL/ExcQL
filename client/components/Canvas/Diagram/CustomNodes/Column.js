import React, { memo } from 'react';
import { Handle } from 'reactflow';

const column = {
  position: `relative`,
  padding: `8px 16px`,
  flexGrow: 1,
  textAlign: `center`,
};

const columnData = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
};

const Column = ({ columnName, columnDataType, isPrimaryKey, linkTo }) => {
  return (
    <div style={column}>
      <Handle type="target" position="left" id={columnName} />
      <div style={columnData}>
        <p className="name">{columnName}</p>
        <p className="data-type">{columnDataType}</p>
      </div>
      <Handle type="source" position="right" id={columnName} />
    </div>
  );
};

export default memo(Column);
