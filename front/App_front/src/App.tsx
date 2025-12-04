import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar/sidebar';
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar';

import { useColors } from './app/features/colors/hooks/useColors';

function App() {
  const { data, isLoading, isError, refetchColors } = useColors();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred while fetching colors data.</div>;
  }
  if (data) {
    console.log('TanStackQueryで取得したdata:', data);
  }
  return (
    <div className="min-h-screen overflow-auto">
      <div className="min-h-screen  bg-[url('/assets/topImage.png')] bg-cover bg-center">
        <div className="min-h-screen bg-white/30">
          <div className="min-h-screen flex flex-col">
            <Header />
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                <button type="button" onClick={refetchColors}>
                  ボタン
                </button>
              </main>
            </SidebarProvider>
            <main className="flex-1 max-w-[960px] w-full px-6 py-8"></main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
