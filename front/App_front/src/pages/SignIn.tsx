import { useAuthStore } from '@/app/store/useAuthStore';
export const SignIn = () => {
  const login = useAuthStore((state) => state.login);
  const handleLogin = () => {
    // ダミーユーザー情報でログイン
    login({ id: '1', name: 'yuji' });
  };
  return (
    <div>
      <h2>Sign In Page</h2>
      <button onClick={handleLogin}>ログインテスト</button>
    </div>
  );
};
