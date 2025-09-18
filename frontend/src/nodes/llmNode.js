import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];

  return (
    <BaseNode title="LLM" handles={handles}>
      <span>This node processes language prompts.</span>
    </BaseNode>
  );
}