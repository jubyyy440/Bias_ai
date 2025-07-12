import { useEffect, useState } from 'react';
import axios from 'axios';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/user/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Analysis History</h2>
      <ul>
        {history.map(h => (
          <li key={h._id} className="mb-4 border-b pb-2">
            <p><b>Text:</b> {h.text}</p>
            <p><b>Bias:</b> {h.bias_type} ({h.confidence})</p>
            <p className="text-sm text-gray-600">{new Date(h.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
