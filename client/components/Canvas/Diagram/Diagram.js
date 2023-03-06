import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  SelectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

import './Diagram.css';
import TableNode from './CustomNodes/TableNode';

const nodeTypes = {
  tableNode: TableNode,
};

const Diagram = ({ tables }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    tables.forEach((tableData, i) => {
      const newNode = {
        id: tableData.tableName,
        position: { x: i * 300, y: 0 },
        data: {
          tableData,
          updateEdge: (newEdge) => {
            setEdges((prev) => [...prev, newEdge]);
          },
        },
        type: `tableNode`,
      };

      setNodes((prev) => {
        return [...prev, newNode];
      });
    });
  }, []);

  const initialEdges = [];

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="diagram">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        panOnScroll={true}
        selectionOnDrag={true}
        selectionMode={SelectionMode.Partial}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Diagram;
