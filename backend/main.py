from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # 1. Import the CORS middleware
from pydantic import BaseModel
from typing import List, Dict, Set

# --- Pydantic Models for Data Validation ---
class NodeData(BaseModel):
    nodeName: str

class Node(BaseModel):
    id: str
    data: NodeData
    
class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# --- FastAPI App Initialization ---
app = FastAPI()

# --- 2. Add and Configure CORS Middleware ---
# This is the new, crucial part.
origins = [
    "http://localhost",
    "http://localhost:3000", # The origin of your React frontend
    "http://localhost:3001", # Your React frontend is running on 3001
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

# --- The Core DAG Detection Algorithm (Unchanged) ---
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    adj: Dict[str, List[str]] = {node.id: [] for node in nodes}
    for edge in edges:
        adj[edge.source].append(edge.target)
    
    visiting: Set[str] = set()
    visited: Set[str] = set()

    def dfs(node_id: str) -> bool:
        visiting.add(node_id)
        for neighbor_id in adj.get(node_id, []):
            if neighbor_id in visiting:
                return False
            if neighbor_id not in visited:
                if not dfs(neighbor_id):
                    return False
        visiting.remove(node_id)
        visited.add(node_id)
        return True

    for node in nodes:
        if node.id not in visited:
            if not dfs(node.id):
                return False
    return True

# --- The FastAPI Endpoint (Unchanged) ---
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_pipeline_dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_pipeline_dag,
    }

@app.get("/")
def read_root():
    return {"Ping": "Pong"}