import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
export default function PublicLayout() {
  const { authStatus } = useAuthStore();
  if (authStatus === 'unknown') {
    // 認証状態が不明な場合、ローディング表示などを行う
    return <div>Loading...</div>;
  } else if (authStatus === 'authenticated') {
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
