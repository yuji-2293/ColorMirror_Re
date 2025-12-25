// ReactHooks
import { useState } from 'react';

// ユーザー認証関連の関数をインポート
import { signUp, signIn, signOut, validateToken } from '@/app/features/auth/auth';
import { type AuthParams } from '@/app/features/colors/types/authType';

import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar/sidebar';
import { AppSidebar } from '@/components/ui/sidebar/app-sidebar';

// ZustandとTanStackQueryのhooks
import { useColors } from '@/app/features/colors/hooks/useColors';
import { useCreateColors } from '@/app/features/colors/hooks/useCreateColors';
import { useStore } from '@/app/store/useStore';
import { TestComponent } from '@/app/store/test';

export default function App() {
  // ZustandとTanStackQueryのhooksを使用してデータを取得
  const { data, isLoading, isError } = useColors();
  const { createColor } = useCreateColors();
  const { count, increment } = useStore();
  // ユーザー認証挙動テスト用のstate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const params: AuthParams = {
    email,
    password,
    password_confirmation: password,
    name,
  };

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

                <div>
                  <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    placeholder="name (signUp用"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <button onClick={() => signUp(params)}>SignUp</button>
                </div>
                <div>
                  <button onClick={validateToken}>validate</button>
                </div>
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
