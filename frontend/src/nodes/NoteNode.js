import { useState } from 'react';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';

export const NoteNode = ({ id, data }) => {
  const nodeName = data.nodeName ?? 'note_0';
  const [text, setText] = useState('A simple note.');

  return (
    <BaseNode
      nodeId={id}
      title="Note"
      description="A text note for documentation"
      nodeName={nodeName}
      hasOutputs={false}
    >
      <TextareaAutosize 
        value={text}
        onChange={(e) => setText(e.target.value)}
        minRows={3}
      />
    </BaseNode>
  );
};