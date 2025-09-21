import React, { useState } from 'react';
import { DraggableNode } from '../../draggableNode';
import { SubmitButton } from '../Submit/submit';
import {
  PiSignIn, PiSignOut, PiTextT, PiNotePencil,
  PiPlay, PiFlag, PiSquaresFour, PiFunnel,
  PiMagnifyingGlass, PiRobot
} from 'react-icons/pi';
import './toolbar.css';

const nodeCategories = [
  { category: 'Start', nodes: [{ type: 'customInput', label: 'Input', icon: <PiSignIn /> }, { type: 'trigger', label: 'Trigger', icon: <PiFlag /> }, { type: 'start', label: 'Start', icon: <PiPlay /> }] },
  { category: 'Objects', nodes: [{ type: 'text', label: 'Text', icon: <PiTextT /> }, { type: 'note', label: 'Note', icon: <PiNotePencil /> }, { type: 'group', label: 'Group', icon: <PiSquaresFour /> }] },
  { category: 'Logic', nodes: [{ type: 'filter', label: 'Filter', icon: <PiFunnel /> }, { type: 'customOutput', label: 'Output', icon: <PiSignOut /> }] },
  { category: 'AI', nodes: [{ type: 'llm', label: 'LLM', icon: <PiRobot /> }] }, 
];

export const PipelineToolbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Start');

  const getFilteredNodes = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    if (lowerCaseSearchTerm) {
      return nodeCategories.flatMap(cat => cat.nodes).filter(node => node.label.toLowerCase().includes(lowerCaseSearchTerm));
    }
    const activeCategory = nodeCategories.find(cat => cat.category === activeTab);
    return activeCategory ? activeCategory.nodes : [];
  };

  const displayedNodes = getFilteredNodes();

  return (
    <div className="pipeline-toolbar">
      <div className="toolbar-controls">
        <div className="search-input-wrapper">
          <PiMagnifyingGlass className="search-input-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search Nodes"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="toolbar-tabs">
          {nodeCategories.map(cat => (
            <button
              key={cat.category}
              className={`toolbar-tab ${activeTab === cat.category ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.category)}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>
      <SubmitButton />
      <div className="toolbar-nodes-container">
        {displayedNodes.map(node => (
          <DraggableNode key={node.type} {...node} />
        ))}
      </div>
    </div>
  );
};