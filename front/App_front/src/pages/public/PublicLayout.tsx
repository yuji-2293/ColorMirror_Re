import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
export default function PublicLayout() {
  const { authStatus } = useAuthStore();
  if (authStatus === 'unknown') {
    // 認証状態が不明な場合,ログインページにリダイレクト
    return <div className="bg-gradient"> Loading...</div>;
  }
  if (authStatus === 'authenticated') {
    // 認証されている場合、ホームページにリダイレクト
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen overflow-auto">
      <div className="min-h-screen  bg-[url('/assets/topImage.png')] bg-cover bg-center">
        <div className="min-h-screen bg-white/30">
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl w-full px-6 py-8 mx-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
