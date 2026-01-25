import { useAuthStore } from '@/app/store/useAuthStore';
import { signOut } from '@/app/features/auth/api/auth';
export const Home = () => {
  // ログアウト処理
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut(); // サーバー側のログアウトAPIを呼び出す
      logout(); // Zustandの状態を更新してログアウト状態にする
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
