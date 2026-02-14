import { create } from 'zustand';
// リダイレクト理由の型定義
type RedirectedReason = 'login_require' | 'logged_out' | null;

interface User {
  id?: number;
  name?: string;
}

interface AuthState {
  authStatus: 'unknown' | 'authenticated' | 'unauthenticated';
  user: User | null;
  redirectedReason: RedirectedReason;
  setRedirectedReason: (reason: RedirectedReason) => void;
  login: (user: User) => void;
  logout: (reason?: RedirectedReason) => void;
  clearRedirectedReason: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authStatus: 'unknown',
  user: null,
  redirectedReason: null,
  // リダイレクト理由を設定する関数
  setRedirectedReason: (reason) => set({ redirectedReason: reason }),
  login: (user) => set({ authStatus: 'authenticated', user, redirectedReason: null }), // ユーザー情報を設定するロジックを追加
  // logout関数は、引数でリダイレクト理由を受け取るようにし、状態を更新する際にその理由をセットする
  logout: (reason = 'login_require') =>
    set({ authStatus: 'unauthenticated', user: null, redirectedReason: reason }),
  // 呼び出すとリダイレクト理由をクリアする関数
  clearRedirectedReason: () => set({ redirectedReason: null }),
}));
