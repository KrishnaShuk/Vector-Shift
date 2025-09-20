import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  // FIX: Use ?? for consistency
  const nodeName = data.nodeName ?? 'filter_0';

  const inputs = [
    { id: `${id}-input` },
  ];

  const outputs = [
    {
      id: `${id}-true`,
      name: 'true',
      description: 'Path if condition is met',
      type: 'Boolean',
    },
    {
      id: `${id}-false`,
      name: 'false',
      description: 'Path if condition is not met',
      type: 'Boolean',
    },
  ];

  return (
    <BaseNode
      nodeId={id}
      title="Filter"
      description="Splits data based on a defined condition"
      nodeName={nodeName}
      inputs={inputs}
      outputs={outputs}
      hasOutputs={true} 
    >
    </BaseNode>
  );
};