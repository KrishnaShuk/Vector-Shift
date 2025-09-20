import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { DeleteIcon } from '../icons/DeleteIcon'; // Import the new component
import './BaseNode.css';

export const BaseNode = ({ nodeId, title, description, nodeName, children, inputs = [], outputs = [] }) => {
  const { updateNodeField, deleteNode } = useStore((state) => ({
    updateNodeField: state.updateNodeField,
    deleteNode: state.deleteNode,
  }));

  const handleNameChange = (e) => {
    updateNodeField(nodeId, 'nodeName', e.target.value);
  };

  const handleDelete = () => {
    deleteNode(nodeId);
  };

  return (
    <div className="base-node-v3">
      <div className="node-main-body">
        {inputs.map((input) => (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={input.id}
            className="input-handle"
            style={{ top: input.style?.top || '50%' }}
          />
        ))}
        
        <div className="node-card">
          <div className="node-header">
            {/* The header is now a flex container with two children */}
            <div className="header-text">
              <div className="node-title">{title}</div>
              <div className="node-description">{description}</div>
            </div>
            {/* The actions are now inside the header, positioned to the right */}
            <div className="node-actions">
              <button onClick={handleDelete} className="action-button delete-button">
                <DeleteIcon />
              </button>
            </div>
          </div>
          
          <div className="node-name-box">
            <input 
              type="text" 
              className="node-name-input" 
              value={nodeName ?? ''} 
              onChange={handleNameChange}
            />
          </div>

          <div className="node-unique-content">
            {children}
          </div>
        </div>
      </div>
      <div className="output-panel-toggle"></div>
      <div className="output-panel"></div>
    </div>
  );
};