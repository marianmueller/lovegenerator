import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const response = await axios.post("/api/generate", { prompt });
      setResult(response.data.result);
    } catch (error: any) {
      setResult("Fehler: " + (error.response?.data?.error || error.message));
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 40 }}>
      <h1>Love Generator ❤️</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", padding: 8, fontSize: 18 }}
          type="text"
          placeholder="Was möchtest du sagen?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <button
          style={{ marginTop: 12, padding: "8px 24px", fontSize: 18 }}
          type="submit"
          disabled={loading || !prompt}
        >
          {loading ? "Wird generiert..." : "Los!"}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: 32, fontSize: 20, background: "#ffecec", padding: 24, borderRadius: 8 }}>
          {result}
        </div>
      )}
    </div>
  );
};

export default App;
