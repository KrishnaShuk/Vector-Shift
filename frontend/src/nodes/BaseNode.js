import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { DeleteIcon } from '../icons/DeleteIcon';
import { PanelToggleIcon } from '../icons/PanelToggleIcon';
import './BaseNode.css';

export const BaseNode = ({ nodeId, title, description, nodeName, hasOutputs = true, children, inputs = [], outputs = [] }) => {
  const { updateNodeField, deleteNode } = useStore((state) => ({ updateNodeField: state.updateNodeField, deleteNode: state.deleteNode }));
  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const handleNameChange = (e) => updateNodeField(nodeId, 'nodeName', e.target.value);
  const handleDelete = () => deleteNode(nodeId);
  const handleToggleOutputs = () => setIsOutputVisible(!isOutputVisible);

  return (
    <div className={`base-node-v3-wrapper ${isOutputVisible ? 'outputs-visible' : ''}`}>
      <div className="node-main-body">
        {inputs.map((input, index) => <Handle key={input.id} type="target" position={Position.Left} id={input.id} className="input-handle" style={{ top: input.style?.top || `${100 / (inputs.length + 1) * (index + 1)}%` }} />)}
        
        {!isOutputVisible && hasOutputs && outputs.map((output, index) => (
          <Handle key={output.id} type="source" position={Position.Right} id={output.id} className="output-handle-body" style={{ top: `${100 / (outputs.length + 1) * (index + 1)}%` }}/>
        ))}

        <div className="node-card">
          <div className="node-header"><div className="header-text"><div className="node-title">{title}</div><div className="node-description">{description}</div></div><div className="node-actions"><button onClick={handleDelete} className="action-button delete-button"><DeleteIcon /></button></div></div>
          <div className="node-name-box"><input type="text" className="node-name-input" value={nodeName ?? ''} onChange={handleNameChange} /></div>
          <div className="node-unique-content">{children}</div>
        </div>
        {hasOutputs && <button onClick={handleToggleOutputs} className={`output-panel-toggle ${isOutputVisible ? 'toggled' : ''}`}><PanelToggleIcon /></button>}
      </div>
      
      {hasOutputs && (
        <div className="output-panel">
          <div className="output-panel-header"><span className="output-header-title">Outputs</span></div>
          <div className="output-list">
            {outputs.map((output) => (
              <div key={output.id} className="output-item">
                <div className="output-info"><span className="output-name">{output.name}</span><span className="output-description">{output.description}</span></div>
                <div className="output-handle-container"><div className={`output-type-tag type-${output.type?.toLowerCase()}`}>{output.type}</div><Handle type="source" position={Position.Right} id={output.id} className="output-handle-panel" /></div>
              </div>
            ))}
            <div className="advanced-outputs"><span>Advanced Outputs</span></div>
          </div>
        </div>
      )}
    </div>
  );
};