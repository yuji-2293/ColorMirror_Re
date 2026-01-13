import { useAuthStore } from '@/app/store/useAuthStore';
export const Home = () => {
  // ログアウト処理
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <h1> Home page </h1>
      <button onClick={handleLogout}>ログアウトテスト</button>
    </div>
  );
};
