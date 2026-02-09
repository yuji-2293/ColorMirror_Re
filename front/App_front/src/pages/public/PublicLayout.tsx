import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar/sidebar';
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
export default function PublicLayout() {
  const { authStatus } = useAuthStore();
  if (authStatus === 'unknown') {
    // 認証状態が不明な場合、ローディング表示などを行う
    return <div>Loading...</div>;
  } else if (authStatus === 'authenticated') {
    // すでに認証されている場合、/ ページにリダイレクト
    return <Navigate to="/" replace state={{ toast: 'redirected', from: location.pathname }} />;
  }
  return (
    <div className="min-h-screen overflow-auto">
      <div className="min-h-screen  bg-[url('/assets/topImage.png')] bg-cover bg-center">
        <div className="min-h-screen bg-white/30">
          <div className="min-h-screen flex flex-col">
            <Header />
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1 max-w-[960px] w-full px-6 py-8">
                <SidebarTrigger />
                <Outlet />
              </main>
            </SidebarProvider>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
