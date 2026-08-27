import { waitFor, renderHook } from '@testing-library/react';
import { useAuthToast } from '@/app/features/auth/hooks/useAuthToasts';
import { describe, it, vi } from 'vitest';
import { toast } from 'sonner';
import { type SignInNavState } from '@/app/features/auth/types/authType';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(() => ({
    state: {
      email: 'test@example.com',
    } as SignInNavState,
  })),
  useNavigate: vi.fn(() => vi.fn()),
}));

const mockClearRedirectedReason = vi.fn();
// zustandのuseAuthStoreをモック化して、clearRedirectedReason関数を返すようにする
vi.mock('@/app/store/useAuthStore', () => ({
  useAuthStore: vi.fn((state) =>
    state({
    clearRedirectedReason: mockClearRedirectedReason,
  })),
}));

describe('useAuthToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('stateにemailがある場合、登録完了のトーストが表示されること', async () => {
    renderHook(() => useAuthToast());
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('登録が完了しました。ログインしてください。');
    });
  });
});
