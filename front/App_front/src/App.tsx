import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getCurrentUser } from '@/app/features/auth/auth';

import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar/sidebar';
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar';

// ZustandとTanStackQueryのhooks
import { useColors } from '@/app/features/colors/hooks/useColors';
import { useCreateColors } from '@/app/features/colors/hooks/useCreateColors';
import { useStore } from '@/app/store/useStore';
import { TestComponent } from '@/app/store/test';

// ログイン状態でページの切り替えを行うコンポーネント
import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';

export const AuthContext = createContext();

function App() {
  // ZustandとTanStackQueryのhooksを使用してデータを取得
  const { data, isLoading, isError } = useColors();
  const { createColor } = useCreateColors();
  const { count, increment } = useStore();
  // ログイン状態を管理するためのstate
  const [Loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred while fetching colors data.</div>;
  }
  if (data) {
    console.log('TanStackQueryでdataの取得成功');
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
                <button type="button" onClick={() => createColor()}>
                  ボタン
                </button>

                <div className="bg-amber-500 w-20 h-20">
                  <p>{count}</p>
                  <button className="text-5xl text-blue-500" onClick={increment}>
                    +1
                  </button>
                </div>
                <TestComponent />
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
