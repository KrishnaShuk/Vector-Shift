import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '66%' } },
  ];

  return (
    <BaseNode title="Filter" handles={handles}>
      <span>Splits data based on a condition.</span>
    </BaseNode>
  );
}  