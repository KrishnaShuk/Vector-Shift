import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  // FIX: Use ?? to allow for an empty string as a valid name
  const nodeName = data.nodeName ?? 'text_0';
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  
  const inputs = []; 
  
  const outputs = [
    {
      id: `${id}-output`,
      name: 'output',
      description: 'The processed text',
      type: 'Text',
    },
  ];

  return (
    <BaseNode
      nodeId={id}
      title="Text"
      description="A block of text that can contain variables"
      nodeName={nodeName}
      inputs={inputs}
      outputs={outputs}
    >
      <label>
        Text
        <textarea 
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)} 
          rows={3}
        />
      </label>
    </BaseNode>
  );
};