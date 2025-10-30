import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import Tree from "./components/Tree";
import "./index.css";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [searchPath, setSearchPath] = useState("");
  const [theme, setTheme] = useState("light");

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setTreeData(parsed);
    } catch {
      alert("Invalid JSON. Please check your input!");
    }
  };

  return (
    <div className={`app-container ${theme}`}>
      <h1>JSON Tree Visualizer</h1>

      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <div className="search-bar-container">
        <SearchBar setSearchPath={setSearchPath} />
      </div>

      <div className="main-content">
        <div className="json-input">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste or Type JSON data"
          />
          <button onClick={handleGenerate}>Generate Tree</button>
        </div>

        <div className="tree-output" style={{ height: "80vh" }}>
          {treeData && (
            <ReactFlowProvider>
              <Tree jsonData={treeData} searchPath={searchPath} theme={theme} />
            </ReactFlowProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
