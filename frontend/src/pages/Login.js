import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('expiry', (Date.now() + 60 * 60 * 1000).toString());
      alert('✅ Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={login} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 mb-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="text-sm mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
    </form>
  );
}
