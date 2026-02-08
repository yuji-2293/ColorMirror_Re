import { useAuthStore } from '@/app/store/useAuthStore';
import { signOut } from '@/app/features/auth/api/auth';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

export const Home = () => {
  const location = useLocation();
  const toastState = (location.state as { toast?: string } | null)?.toast;
  console.log(location.state);
  if (toastState === 'authenticated') {
    toast.success('すでにログイン済みです');
  }

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
