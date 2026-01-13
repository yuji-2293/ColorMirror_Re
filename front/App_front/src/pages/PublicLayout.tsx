import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
export default function PublicLayout() {
  const { authStatus } = useAuthStore();
  if (authStatus === 'authenticated') {
    // すでに認証されている場合、/ ページにリダイレクト
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <h1> Public Layout </h1>
      <Outlet />
    </div>
  );
}
