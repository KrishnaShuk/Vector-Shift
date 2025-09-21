import React from 'react';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  updateTextNodeAndSyncEdges: state.updateTextNodeAndSyncEdges,
});

export const TextNode = ({ id, data }) => {
  const { updateTextNodeAndSyncEdges } = useStore(selector, shallow);
  
  const nodeName = data.nodeName ?? 'text_0';
  const currText = data.text ?? '{{input_0}}';

  const handleTextChange = (e) => {
    updateTextNodeAndSyncEdges(id, e.target.value);
  };
  
  const inputs = [
    { id: `${id}-input` }, 
  ];
  
  const outputs = [
    { id: `${id}-output`, name: 'output', description: 'The processed text', type: 'Text' }
  ];

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
      <label htmlFor={`${id}-text-area`}>Text</label>
      <TextareaAutosize 
        id={`${id}-text-area`}
        value={currText} 
        onChange={handleTextChange}
        minRows={1}
      />
    </BaseNode>
  );
};