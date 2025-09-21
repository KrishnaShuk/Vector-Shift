import { BaseNode } from './BaseNode';

export const GroupNode = ({ id, data }) => {
  const nodeName = data.nodeName ?? 'group_0';
  return (
    <BaseNode
      nodeId={id}
      title="Group"
      description="Groups a set of nodes together"
      nodeName={nodeName}
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output`, name: 'group', type: 'Group' }]}
    />
  );
};