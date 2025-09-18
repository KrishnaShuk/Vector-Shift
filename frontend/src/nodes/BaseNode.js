import React from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

// The new BaseNode is a powerful, data-driven component that generates
// a two-column layout from props.
export const BaseNode = ({ icon: Icon, title, children, outputs }) => {
  return (
    <div className="base-node">
      {/* Left Column: The main body of the node */}
      <div className="node-body">
        <div className="node-header">
          {Icon && <div className="header-icon"><Icon /></div>}
          <div className="header-title">{title}</div>
        </div>
        <div className="node-content">
          {children}
        </div>
      </div>

      {/* Right Column: The output panel, generated from the 'outputs' prop */}
      <div className="output-panel">
        {outputs && outputs.map((output) => (
          <div className="output-item" key={output.id}>
            <div className="output-info">
              <div className="output-name">{output.name}</div>
              <div className="output-description">{output.description}</div>
            </div>
            <div className="output-tag-handle-wrapper">
              {output.type && <div className="output-type-tag">{output.type}</div>}
              <Handle
                type="source"
                position={Position.Right}
                id={output.id}
                className="output-handle"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};