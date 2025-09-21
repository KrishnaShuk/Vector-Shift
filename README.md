# VectorShift Frontend Technical Assessment

It is a full-stack application featuring a React-based frontend and a Python/FastAPI backend, designed to create and validate data processing pipelines.

## Tech Stack

### Frontend
*   **React** 
*   **React Flow** 
*   **Zustand** 
*   **CSS** 

### Backend
*   **Python 3** 
*   **FastAPI**
*   **Pydantic** 
*   **Uvicorn** 

## Project Structure

The project is organized into two main folders: `frontend` and `backend`.

```
/
├── backend/
│   ├── venv/           # Python virtual environment
│   └── main.py         # The FastAPI application and API logic
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/ # Reusable components (e.g., CustomEdge)
    │   ├── icons/      # Dependency-free SVG icon components
    │   ├── nodes/      # All node type components
    │   ├── App.js      # Main application component
    │   ├── store.js    # Zustand global state management
    │   ├── ui.js       # The main React Flow canvas component
    │   └── ...
    └── package.json
```

## Getting Started

To run this project, you will need to set up and run both the backend and frontend servers simultaneously in two separate terminals.

### Prerequisites

*   Node.js and npm
*   Python 3 and pip
*   The `venv` module for Python

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required Python packages:**
    (you will need to install the dependencies manually: `pip install "fastapi[all]"`)
    ```bash
    pip install "fastapi[all]"
    ```

4.  **Run the backend server:**
    The frontend is configured to communicate with the backend on port `8001`.
    ```bash
    uvicorn main:app --reload --port 8001
    ```
    The server will be running at `http://localhost:8001`.

### Frontend Setup

1.  **Open a new terminal.**

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

3.  **Install the required npm packages:**
    ```bash
    npm install
    ```

4.  **Run the frontend development server:**
    ```bash
    npm start
    ```
    The application will automatically open in your default browser, typically at `http://localhost:3000`.

You can now use the application to build and submit pipelines.
