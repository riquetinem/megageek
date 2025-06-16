import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Menu from './Menu';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu />
      <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
