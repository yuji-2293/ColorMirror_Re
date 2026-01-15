import { useAuthStore } from '@/app/store/useAuthStore';
import { signOut } from '@/app/features/auth/api/auth';
export const Home = () => {
  // ログアウト処理
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    await signOut();
    logout();
  };
  return (
    <div>
      <h1> Home page </h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
