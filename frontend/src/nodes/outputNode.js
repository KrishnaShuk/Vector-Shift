import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  // FIX: Use ?? to allow for an empty string as a valid name
  const nodeName = data.nodeName ?? 'output_0';

  const inputs = [
    { id: `${id}-value` },
  ];

  return (
    <BaseNode
      nodeId={id}
      title="Output"
      description="Receives data at the end of a workflow"
      nodeName={nodeName}
      inputs={inputs}
      outputs={[]}
      hasOutputs={false}
    >
      <p style={{color: 'var(--color-text-medium)', fontSize: 'var(--font-size-sm)'}}>
        The final output of this path will be named "{nodeName}".
      </p>
    </BaseNode>
  );
};