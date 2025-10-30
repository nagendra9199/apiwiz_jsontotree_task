import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import jsonToTree from "../utils/jsonToTree";

const Tree = ({ jsonData, searchPath }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  let flow;

  try {
    flow = useReactFlow();
  } catch (err) {
    console.warn("⚠️ useReactFlow failed:", err.message);
  }


  useEffect(() => {
    if (!jsonData) return;
    try {
      const { nodes, edges } = jsonToTree(jsonData);
      console.log("✅ Generated tree:", { nodeCount: nodes.length, edgeCount: edges.length });
      setNodes(nodes);
      setEdges(edges);
    } catch (err) {
      console.error("❌ Error in jsonToTree:", err);
    }
  }, [jsonData]);

 

  useEffect(() => {
    if (!searchPath) return;
    console.log("🔍 Search triggered:", searchPath);

    if (nodes.length === 0) {
      console.warn("⚠️ No nodes available yet for search");
      return;
    }

    try {


      const normalizedPath = searchPath
        .trim()
        .replace(/^\$\./, "")
        .replace(/\[(\d+)\]/g, ".$1")
        .toLowerCase();

      console.log("🔧 Normalized search path:", normalizedPath);

      const matchedNodes = nodes.filter((n) => {
        const label = String(n.data?.label || "").toLowerCase();
        return (
          label.includes(normalizedPath) ||
          normalizedPath.includes(label.split(":")[0].trim())
        );
      });

      console.log("🔎 Found matches:", matchedNodes.map((n) => n.data?.label));

      if (matchedNodes.length > 0) {
        

        setNodes((prev) =>
          prev.map((n) =>
            matchedNodes.includes(n)
              ? {
                  ...n,
                  style: {
                    ...n.style,
                    background: "#dc2626",
                    border: "3px solid #fff",
                    color: "#fff",
                    opacity: 1,
                  },
                }
              : {
                  ...n,
                  style: { ...n.style, opacity: 0.4 },
                }
          )
        );




        const targetNode = matchedNodes[0];
        if (flow?.setCenter && targetNode?.position) {
          console.log("🎯 Centering to:", targetNode.data.label);
          flow.setCenter(targetNode.position.x, targetNode.position.y, {
            zoom: 1.5,
            duration: 800,
          });
        }
      } else {
        alert("❌ No match found");


        setNodes((prev) =>
          prev.map((n) => ({
            ...n,
            style: { ...n.style, opacity: 1 },
          }))
        );
      }
    } catch (err) {
      console.error("❌ Search error:", err);
    }
  }, [searchPath]);



  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f7f7f7",
        borderRadius: "12px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onInit={() => console.log("🌳 ReactFlow initialized")}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag
        zoomOnScroll
        panOnScroll
        zoomOnPinch
      >
        <Background color="#ddd" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Tree;
