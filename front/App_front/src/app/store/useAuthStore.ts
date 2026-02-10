import { create } from 'zustand';
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
  setRedirectedReason: (reason) => set({ redirectedReason: reason }),
  login: (user) => set({ authStatus: 'authenticated', user, redirectedReason: null }), // ユーザー情報を設定するロジックを追加
  logout: (reason = 'login_require') =>
    set({ authStatus: 'unauthenticated', user: null, redirectedReason: reason }),
  clearRedirectedReason: () => set({ redirectedReason: null }),
}));
