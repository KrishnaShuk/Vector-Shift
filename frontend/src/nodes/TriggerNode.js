import { BaseNode } from './BaseNode';

export const TriggerNode = ({ id, data }) => {
  const nodeName = data.nodeName ?? 'trigger_0';
  return (
    <BaseNode
      nodeId={id}
      title="Trigger"
      description="Starts a workflow on an event"
      nodeName={nodeName}
      outputs={[{ id: `${id}-output`, name: 'trigger', type: 'Trigger' }]}
    />
  );
};