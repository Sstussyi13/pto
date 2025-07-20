import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../api/axios';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    API.get('/api/admin/check')
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Проверка авторизации...</div>;
  return authorized ? children : <Navigate to="/super/login" />;
}
