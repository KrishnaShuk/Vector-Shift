import React from 'react';
import { getSmoothStepPath } from 'reactflow';
import { useStore } from '../../store'; 
import { DeleteIcon } from '../../icons/DeleteIcon';
import './CustomEdge.css';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}) => {
  const { deleteEdge } = useStore((state) => ({ deleteEdge: state.deleteEdge }));
  
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = (evt) => {
    evt.stopPropagation();
    deleteEdge(id);
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={40}
        height={40}
        x={labelX - 20}
        y={labelY - 20}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="edgebutton-wrapper">
          <button className="edgebutton" onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </div>
      </foreignObject>
    </>
  );
};