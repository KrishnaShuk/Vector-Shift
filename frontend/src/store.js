import { create } from "zustand";
import { persist } from 'zustand/middleware'; // 1. Import the persist middleware
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

// 2. Wrap the entire store creator function with persist()
export const useStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      nodeIDs: {},
      getNodeID: (type) => {
          const newIDs = {...get().nodeIDs};
          if (newIDs[type] === undefined) {
              newIDs[type] = 0;
          }
          newIDs[type] += 1;
          set({nodeIDs: newIDs});
          return `${type}-${newIDs[type]}`;
      },
      addNode: (node) => {
          set({
              nodes: [...get().nodes, node]
          });
      },
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection) => {
        set({
          edges: addEdge({
            ...connection, 
            type: 'custom', 
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow, 
              height: '15px', 
              width: '15px'
            }
          }, get().edges),
        });
      },
      deleteNode: (nodeId) => {
        set({
          nodes: get().nodes.filter(node => node.id !== nodeId),
          edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId),
        });
      },
      deleteEdge: (edgeId) => {
        set({
          edges: get().edges.filter(edge => edge.id !== edgeId),
        });
      },
      updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, [fieldName]: fieldValue };
            }
    
            return node;
          }),
        });
      },
    }),
    // 3. Add a configuration object for the middleware
    {
      name: 'vectorshift-pipeline-storage', // This is the key in localStorage
    }
  )
);