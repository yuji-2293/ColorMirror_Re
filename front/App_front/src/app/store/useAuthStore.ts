import { create } from 'zustand';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  authStatus: 'unknown' | 'authenticated' | 'unauthenticated';
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authStatus: 'unknown',
  user: null,
  login: (user) => set({ authStatus: 'authenticated', user }), // ユーザー情報を設定するロジックを追加
  logout: () => set({ authStatus: 'unauthenticated', user: null }),
}));
