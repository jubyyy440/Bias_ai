import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <Navbar />
            <History />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;