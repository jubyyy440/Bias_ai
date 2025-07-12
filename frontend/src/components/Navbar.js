import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg">BiasShield</span>
      </div>
      <div>
        <Link to="/dashboard" className="mx-2 hover:text-blue-400">Dashboard</Link>
        <Link to="/history" className="mx-2 hover:text-blue-400">History</Link>
        <button onClick={logout} className="ml-4 text-red-400 hover:text-red-600">Logout</button>
      </div>
    </nav>
  );
}