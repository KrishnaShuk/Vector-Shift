import React from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

// The BaseNode will act as a configurable shell for all other nodes.
export const BaseNode = ({ title, handles, children }) => {
  return (
    <div className="base-node">
      {/* Render all handles defined in the props */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style || {}} // Apply custom styles if provided
        />
      ))}
      
      <div className="node-header">
        <span>{title}</span>
      </div>
      
      <div className="node-content">
        {/* Render the unique content for each specific node */}
        {children}
      </div>
    </div>
  );
};