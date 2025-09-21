import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/FilterNode';
import { CustomEdge } from './components/CustomEdge/CustomEdge';
import 'reactflow/dist/style.css';
import './components/CustomEdge/CustomEdge.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = { customInput: InputNode, llm: LLMNode, customOutput: OutputNode, text: TextNode, filter: FilterNode };
const edgeTypes = { custom: CustomEdge };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      if (typeof appData?.nodeType === 'undefined' || !appData.nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create a simple node object. The store will handle naming and ID logic.
      const newNode = {
        id: `${appData.nodeType}-${+new Date()}`, // A simple unique ID
        type: appData.nodeType,
        position,
        data: { }, // The store will populate the name
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        onConnect={onConnect} onDrop={onDrop} onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes} edgeTypes={edgeTypes}
        proOptions={proOptions} snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
      >
        <Background variant="dots" gap={16} size={1} color="#d1d5db" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};