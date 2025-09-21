from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

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

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    adj = {node.id: [] for node in nodes}
    for edge in edges:
        adj[edge.source].append(edge.target)

    visiting, visited = set(), set()

    def dfs(node_id: str) -> bool:
        visiting.add(node_id)
        for neighbor_id in adj.get(node_id, []):
            if neighbor_id in visiting:
                return False
            if neighbor_id not in visited and not dfs(neighbor_id):
                return False
        visiting.remove(node_id)
        visited.add(node_id)
        return True

    return all(dfs(node.id) for node in nodes if node.id not in visited)

def is_connected(nodes: List[Node], edges: List[Edge]) -> bool:
    if not nodes or len(nodes) <= 1:
        return True

    adj = {node.id: [] for node in nodes}
    for edge in edges:
        adj[edge.source].append(edge.target)
        adj[edge.target].append(edge.source)

    visited = set()
    stack = [nodes[0].id]

    while stack:
        node_id = stack.pop()
        if node_id not in visited:
            visited.add(node_id)
            stack.extend(n for n in adj.get(node_id, []) if n not in visited)

    return len(visited) == len(nodes)

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_acyclic": is_dag(pipeline.nodes, pipeline.edges),
        "is_connected": is_connected(pipeline.nodes, pipeline.edges),
    }

@app.get("/")
def read_root():
    return {"Ping": "Pong"}
