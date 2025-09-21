import React from 'react';
import { useStore } from '../../store';
import { shallow } from 'zustand/shallow';
import './submit.css'; // We will create this CSS file next

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    // 1. Prepare the data payload
    const pipelineData = {
      nodes: nodes,
      edges: edges,
    };

    try {
      // 2. Make the API call using fetch
      const response = await fetch('http://localhost:8001/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 3. Parse the JSON response from the backend
      const result = await response.json();

      // 4. Create a user-friendly message and display the alert
      const dagStatus = result.is_dag ? 'Success! The pipeline is a valid DAG.' : 'Error! The pipeline contains a cycle and is not a valid DAG.';
      const message = `
        Pipeline Analysis Complete!
        -----------------------------------
        Number of Nodes: ${result.num_nodes}
        Number of Edges: ${result.num_edges}
        -----------------------------------
        Status: ${dagStatus}
      `;
      alert(message);

    } catch (error) {
      // 5. Handle any errors that occurred during the fetch
      console.error('There was an error submitting the pipeline:', error);
      alert(`An error occurred while submitting the pipeline:\n\n${error.message}`);
    }
  };

  return (
    <div className="submit-container">
      <button className="submit-button" onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
};