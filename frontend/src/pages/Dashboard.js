import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const name = localStorage.getItem('name');

  const analyze = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/bias/analyze', { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setResult(res.data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Welcome, {name}</h2>
      <textarea
        className="w-full h-40 p-2 border rounded"
        placeholder="Paste text here..."
        onChange={e => setText(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={analyze}
      >
        Analyze
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><b>Bias Type:</b> {result.bias_type}</p>
          {result.confidence !== "AI Inference" && (
            <>
              <p><b>Confidence:</b> {result.confidence}</p>
              <input
                type="range"
                min="0"
                max="100"
                value={parseInt(result.confidence)}
                readOnly
                className="w-full mt-2"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
