import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  // FIX: Use ?? for consistency
  const nodeName = data.nodeName ?? 'llm_0';

  const inputs = [
    { id: `${id}-system`, style: { top: '33%' } },
    { id: `${id}-prompt`, style: { top: '66%' } },
  ];

  const outputs = [
    {
      id: `${id}-response`,
      name: 'response',
      description: 'The LLM generated response',
      type: 'Text',
    },
  ];

  return (
    <BaseNode
      nodeId={id}
      title="LLM"
      description="Processes prompts using a Large Language Model"
      nodeName={nodeName}
      inputs={inputs}
      outputs={outputs}
      hasOutputs={true}
    >
    </BaseNode>
  );
};