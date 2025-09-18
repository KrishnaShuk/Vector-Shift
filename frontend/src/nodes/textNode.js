// frontend/src/nodes/textNode.js 

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode title="Text" handles={handles}>
      <label>
        Text:
        <input 
          type="text" 
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)} 
        />
      </label>
    </BaseNode>
  );
}