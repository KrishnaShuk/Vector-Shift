import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const nodeName = data.nodeName ?? 'input_0';
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const outputs = [
    {
      id: `${id}-value`,
      name: nodeName,
      description: `The input data of type ${inputType}`,
      type: inputType,
    },
  ];

  return (
    <BaseNode
      nodeId={id}
      title="Input"
      description="Pass data of different types into your workflow"
      nodeName={nodeName}
      outputs={outputs}
      hasOutputs={true}
    >
      <label>
        Type
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}