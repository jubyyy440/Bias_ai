import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    const now = Date.now();
    if (token && expiry && now < parseInt(expiry)) {
      setIsValid(true);
    } else {
      localStorage.clear();
      setIsValid(false);
    }
  }, []);

  return isValid ? children : <Navigate to="/" replace />;
}