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
    <header className="bg-gradient w-full px-6 py-4 mx-auto">
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between ">
        <div className="header-text">
          <p className="text-3xl font-bold  text-gray-500">Color Mirror_Re</p>
        </div>

        <div className="header-content sm:flex sm:flex-col sm:items-center gap-2">
          {isAuthenticated && (
            <div className="">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                ログアウト
              </button>
            </div>
          )}
          <div className="text-red-500 text-md underline font-bold text-right">
            {isAuthenticated
              ? `ログイン中のユーザー:  ${currentUserName} さん`
              : 'ゲストさん ログインをお願いします.'}
          </div>
        </div>
      </div>
    </header>
  );
};
