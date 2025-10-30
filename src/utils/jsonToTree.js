let nodeId = 0;

const H_GAP = 250;
const V_GAP = 100;

const createNode = (label, level, color, x, y) => {
  const id = `${nodeId++}`;
  return {
    id,
    data: { label },
    position: { x, y },
    style: {
      background: color,
      color: "#fff",
      borderRadius: 8,
      padding: "8px 12px",
      border: "2px solid #fff",
      fontWeight: 600,
      fontSize: 14,
      textAlign: "center",
      minWidth: 100,
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
  };
};

const traverse = (key, value, level = 0, yOffset = 0, parentId = null) => {
  const nodes = [];
  const edges = [];

  const isArray = Array.isArray(value);
  const isObject = typeof value === "object" && value !== null && !isArray;

  let color = "#6366f1";
  if (isArray) color = "#10b981";
  else if (!isObject) color = "#f59e0b";

  const label =
    key === null
      ? "root"
      : isObject || isArray
      ? `${key}`
      : `${key}: ${String(value)}`;

  const x = level * H_GAP;
  const y = yOffset * V_GAP;
  const node = createNode(label, level, color, x, y);
  nodes.push(node);

  if (parentId) {
    edges.push({
      id: `${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      animated: false,
      style: { strokeWidth: 2 },
    });
  }

  if (isObject || isArray) {
    const entries = isArray
      ? value.map((v, i) => [i, v])
      : Object.entries(value);

    let currentY = yOffset;
    entries.forEach(([childKey, childValue]) => {
      const { nodes: childNodes, edges: childEdges, nextY } = traverse(
        childKey,
        childValue,
        level + 1,
        currentY,
        node.id
      );
      nodes.push(...childNodes);
      edges.push(...childEdges);
      currentY = nextY;
    });
    return { nodes, edges, nextY: currentY + 1 };
  }

  return { nodes, edges, nextY: yOffset + 1 };
};

export default function jsonToTree(jsonData) {
  nodeId = 0;
  const { nodes, edges } = traverse("root", jsonData, 0, 0, null);
  return { nodes, edges };
}
