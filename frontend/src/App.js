import { PipelineToolbar } from "./components/Toolbar/toolbar";
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="app-container">
      <PipelineToolbar />
      <div className="canvas-container">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;