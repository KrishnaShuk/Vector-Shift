import React from 'react';
import { useStore } from '../../store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    const pipelineData = { nodes, edges };

    try {
      const response = await fetch('http://localhost:8001/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      const isValid = result.is_acyclic && result.is_connected;

      let statusMessage = '';
      if (isValid) {
        statusMessage = 'Success! The pipeline is valid.';
      } else if (result.num_nodes > 1 && !result.is_connected) {
        statusMessage = 'Error! The pipeline is not fully connected.';
      } else if (!result.is_acyclic) {
        statusMessage = 'Error! The pipeline contains a cycle.';
      } else {
        statusMessage = 'Error! The pipeline is invalid.';
      }

      const message = `
Pipeline Analysis Complete!
-----------------------------------
Number of Nodes: ${result.num_nodes}
Number of Edges: ${result.num_edges}
-----------------------------------
Status: ${statusMessage}
      `;
      alert(message);

    } catch (error) {
      console.error('Error submitting the pipeline:', error);
      alert(`An error occurred while submitting the pipeline:\n\n${error.message}`);
    }
  };

  return (
    <div className="submit-button-wrapper">
      <button className="submit-button" onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
};
