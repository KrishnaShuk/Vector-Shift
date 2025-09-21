import { BaseNode } from './BaseNode';

export const StartNode = ({ id, data }) => {
  const nodeName = data.nodeName ?? 'start_0';
  return (
    <BaseNode
      nodeId={id}
      title="Start"
      description="A manual start point for a workflow"
      nodeName={nodeName}
      outputs={[{ id: `${id}-output`, name: 'start', type: 'Flow' }]}
    />
  );
};