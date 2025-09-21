import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';

const store = (set, get) => ({
  nodes: [],
  edges: [],
  // REMOVED the flawed nodeIDs counter
  addNode: (node) => {
    const allNodes = get().nodes;
    const type = node.type;
    const baseName = type.replace('custom', '').toLowerCase(); // 'customInput' -> 'input'

    // Find all nodes of the same base type to determine the next available index
    const existingNodesOfType = allNodes.filter(n => n.type === type);
    const existingIndices = existingNodesOfType.map(n => {
      const match = n.data.nodeName.match(/_(\d+)$/);
      return match ? parseInt(match[1], 10) : -1;
    });

    let newIndex = 0;
    while (existingIndices.includes(newIndex)) {
      newIndex++;
    }

    // Assign the new, unique, and correct nodeName
    node.data.nodeName = `${baseName}_${newIndex}`;

    set({ nodes: [...allNodes, node] });
  },
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge({ ...connection, type: 'custom', animated: true, markerEnd: { type: MarkerType.Arrow, height: '15px', width: '15px' } }, get().edges) }),
  deleteNode: (nodeId) => set({ nodes: get().nodes.filter(n => n.id !== nodeId), edges: get().edges.filter(e => e.source !== nodeId && e.target !== nodeId) }),
  deleteEdge: (edgeId) => set({ edges: get().edges.filter(e => e.id !== edgeId) }),
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
        }
        return node;
      }),
    });
  },
  updateTextNodeAndSyncEdges: (textNodeId, newText) => {
    const variableRegex = /{{\s*([^}]+)\s*}}/g;
    const variablesInText = new Set(Array.from(newText.matchAll(variableRegex), match => match[1].trim()));
    const allNodes = get().nodes;
    const edgesToKeep = get().edges.filter(edge => edge.target !== textNodeId);
    const newEdges = [];

    variablesInText.forEach(nodeName => {
      const sourceNode = allNodes.find(n => n.data.nodeName === nodeName);
      if (sourceNode) {
        newEdges.push({
          id: `e-${sourceNode.id}-${textNodeId}-${sourceNode.data.nodeName}`,
          source: sourceNode.id, target: textNodeId,
          sourceHandle: `${sourceNode.id}-value`, targetHandle: `${textNodeId}-input`,
          type: 'custom', markerEnd: { type: MarkerType.Arrow, height: '15px', width: '15px' },
        });
      }
    });

    get().updateNodeField(textNodeId, 'text', newText);
    set({ edges: [...edgesToKeep, ...newEdges] });
  },
});

export const useStore = create(persist(store, { name: 'vectorshift-pipeline-storage' }));