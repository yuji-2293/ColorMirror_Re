import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ユーザー認証機能用ページコンポーネント
import { Home } from '@/pages/private/components/Home';
import { SignIn } from '@/pages/public/components/SignIn';
import { SignUp } from '@/pages/public/components/SignUp';
import PublicLayout from '@/pages/public/PublicLayout';
import PrivateLayout from '@/pages/private/PrivateLayout';
// 認証復元処理
import { validateToken } from '@/app/features/auth/api/auth';
// zustand の状態管理用関数
import { useAuthStore } from '@/app/store/useAuthStore';
// toast用UIのインポート
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  // zustand の状態管理で使用するためのstateと関数
  const { login, logout, authStatus } = useAuthStore();

  // strict-mode 対応のため、2回実行されないようにガード
  const restoreStartedRef = useRef(false);

  // アプリ起動時に認証復元処理を実行
  useEffect(() => {
    if (restoreStartedRef.current) return;
    if (authStatus !== 'unknown') return;
    restoreStartedRef.current = true;

    const restoreAuth = async () => {
      try {
        const res = await validateToken();
        const user = res.data;
        console.log(user.id, user.name);
        login({ id: user.id, name: user.name });
      } catch {
        logout();
      }
    };
    restoreAuth();
  }, [login, logout, authStatus]);
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          {/* 公開レイアウト */}
          <Route element={<PublicLayout />}>
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
          </Route>

          {/* 認証後のレイアウト */}
          <Route element={<PrivateLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<h1>StatusCode-404 Not Found Page</h1>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
