import { useAuthStore } from '@/app/store/useAuthStore';
import { signOut } from '@/app/features/auth/api/auth';

export const Header = () => {
  // 認証状態とユーザー情報をzustandから取得
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const authStatus = useAuthStore((state) => state.authStatus);

  // 認証状態に基づいて表示内容を切り替える
  const isAuthenticated = authStatus === 'authenticated';
  const currentUserName = isAuthenticated ? user?.name : 'Guest';
  // ログアウト処理

  const handleLogout = async () => {
    try {
      await signOut(); // サーバー側のログアウトAPIを呼び出す
    } finally {
      logout('logged_out'); // Zustandの状態を更新してログアウト状態にする
    }
  };

  return (
    <header className="header-gradient w-full px-6 py-4 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Color Mirror_Re</h1>
        {isAuthenticated && (
          <div className="mt-2">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              ログアウト
            </button>
          </div>
        )}
      </div>
      <div className="text-red-500 text-md mt-1 font-bold text-right">
        {isAuthenticated
          ? `ログイン中:  ${currentUserName} さん`
          : '未ログイン: ゲストさん ログインをお願いします.'}
      </div>
    </header>
  );
};
