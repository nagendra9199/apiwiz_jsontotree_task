import React, { useState } from "react";

const sampleJson = `
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": { "city": "New York", "country": "USA" },
    "items": [{ "name": "item1" }, { "name": "item2" }]
  }
}
`;

const JSONInput = ({ setJsonData }) => {
  const [input, setInput] = useState(sampleJson);
  const [error, setError] = useState("");

  const handleVisualize = () => {
    try {
        console.log("Input JSON:", input);
      const parsed = JSON.parse(input);
      setJsonData(parsed);
      setError("");
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="flex gap-3">
      <textarea
        className="w-1/2 border rounded p-2"
        rows="12"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex flex-col justify-start gap-2">
        <button
          onClick={handleVisualize}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Tree
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default JSONInput;
