import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '@/app/store/useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      authStatus: 'unknown',
      user: null,
      redirectedReason: null,
    });
  });
  it('login関数が呼ばれると、認証済み状態に更新する', () => {
    const user = { id: 1, name: 'yuji' };
    useAuthStore.getState().login(user);
    const state = useAuthStore.getState();
    expect(state.authStatus).toBe('authenticated');
    expect(state.user).toEqual(user);
    expect(state.redirectedReason).toBeNull();
  });
  it('logout関数が呼ばれると、未認証状態に更新し、リダイレクト理由を設定する', () => {
    const reason = 'login_require';
    useAuthStore.getState().logout(reason);
    const state = useAuthStore.getState();
    expect(state.authStatus).toBe('unauthenticated');
    expect(state.user).toBeNull();
    expect(state.redirectedReason).toBe(reason);
  });
  it('clearRedirectedReason関数が呼ばれると、リダイレクト理由をクリアする', () => {
    useAuthStore.getState().setRedirectedReason('logged_out');
    useAuthStore.getState().clearRedirectedReason();
    const state = useAuthStore.getState();
    expect(state.redirectedReason).toBeNull();
  });
});
