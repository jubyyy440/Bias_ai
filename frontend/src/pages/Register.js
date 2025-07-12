import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    // Only redirect if token exists and user is NOT on the register page
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const register = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await axios.post('http://localhost:5000/auth/register', form);
      alert('✅ Registration successful! Please login.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={register} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="w-full p-2 mb-2 border rounded"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="text-sm mt-2">Already have an account? <Link to="/" className="text-blue-500">Login</Link></p>
    </form>
  );
}