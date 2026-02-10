import { useAuthStore } from '@/app/store/useAuthStore';
import { signOut } from '@/app/features/auth/api/auth';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
export const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // strict-mode 対応のため、2回実行されないようにガード
  const restoreStartedRef = useRef(false);

  const toastState = (location.state as { toast?: string } | null)?.toast;
  console.log(toastState);
  useEffect(() => {
    if (restoreStartedRef.current) return;
    if (!toastState) return;
    restoreStartedRef.current = true;

    if (toastState === 'logIn') {
      toast.success('すでにログイン済みです');
      navigate('/', { replace: true, state: null });
    }
  }, [toastState, navigate]);

  // ログアウト処理
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut(); // サーバー側のログアウトAPIを呼び出す
      toast.success('ログアウトに成功しました。');
      logout(); // Zustandの状態を更新してログアウト状態にする
      navigate('/signIn', { replace: true, state: { toast: 'logOut' } });
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
