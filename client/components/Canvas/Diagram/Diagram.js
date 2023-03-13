import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
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

const Diagram = ({ tables, activeTab }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    // We need to reset edges or else old edges from previous render
    // can stick around, resulting in incorrect edges
    setEdges([]);
    const nodes = [];
    tables.forEach((tableData, i) => {
      nodes.push({
        id: tableData.table,
        position: { x: i * 300, y: 0 },
        data: {
          tableData,
          updateEdge: (newEdge) => {
            setEdges((prev) => [...prev, newEdge]);
          },
        },
        type: `tableNode`,
      });
    });
    setNodes(nodes);
  }, [tables]);

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
    <div
      className={`diagram ${activeTab === `diagram` ? `active-diagram` : ``}`}
    >
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
