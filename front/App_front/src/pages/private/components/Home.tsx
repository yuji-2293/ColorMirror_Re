import { useAuthStore } from '@/app/store/useAuthStore';
import { signOut } from '@/app/features/auth/api/auth';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state === 'redirected') {
      toast.success('すでにログイン済みです');
      navigate('/', { replace: true, state: null });
    }
  }, [location.state, navigate]);
  // ログアウト処理
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut(); // サーバー側のログアウトAPIを呼び出す
      logout(); // Zustandの状態を更新してログアウト状態にする
      toast.success('ログアウトに成功しました。');
    } catch (error) {
      logout(); // エラーが発生しても状態を更新してログアウト状態にする
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <div>
      <h1> Home page </h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
