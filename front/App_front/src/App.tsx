import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar/sidebar';
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar';
import colorsGetData from '@/app/features/colors/api/colorsGetData';
function App() {
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
                <button type="button" onClick={colorsGetData}>
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
