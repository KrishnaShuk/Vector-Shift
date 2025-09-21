import { useState } from 'react';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';

export const TextNode = ({ id, data }) => {
  const nodeName = data.nodeName ?? 'text_0';
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  
  const inputs = [
    { id: `${id}-input` },
  ];
  
  const outputs = [
    {
      id: `${id}-output`,
      name: 'output',
      description: 'The processed text',
      type: 'Text',
    },
  ];

  const textAreaId = `${id}-text-area`; // Create a unique ID for the textarea

  return (
    <BaseNode
      nodeId={id}
      title="Text"
      description="A block of text that can contain variables"
      nodeName={nodeName}
      inputs={inputs}
      outputs={outputs}
      hasOutputs={true}
    >
      {/* FIX: The label and textarea are now separate sibling elements */}
      <label htmlFor={textAreaId}>
        Text
      </label>
      <TextareaAutosize 
        id={textAreaId}
        value={currText} 
        onChange={(e) => setCurrText(e.target.value)}
        minRows={1}
      />
    </BaseNode>
  );
};