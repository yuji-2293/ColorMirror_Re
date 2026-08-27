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

const mockClearRedirectedReason = vi.fn();
// zustandのuseAuthStoreをモック化して、clearRedirectedReason関数を返すようにする
vi.mock('@/app/store/useAuthStore', () => ({
  useAuthStore: vi.fn((state) =>
    state({
      clearRedirectedReason: mockClearRedirectedReason,
    })
  ),
}));

const { mockUseLocation, mockUseNavigate } = vi.hoisted(() => ({
  mockUseLocation: vi.fn(),
  mockUseNavigate: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useLocation: mockUseLocation,
  useNavigate: () => mockUseNavigate,
}));

describe('useAuthToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('stateにemailがある場合、登録完了のトーストが表示されること', async () => {
    mockUseLocation.mockReturnValue({
      state: {
        email: 'e',
      } as SignInNavState,
    });

    renderHook(() => useAuthToast());
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('登録が完了しました。ログインしてください。');
    });
  });

  it('stateにtoast=login_requireの時、ログインが必要なトーストが表示されること', async () => {
    mockUseLocation.mockReturnValue({
      state: {
        toast: 'login_require',
      } as SignInNavState,
    });
    renderHook(() => useAuthToast());
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('ログインが必要です。');
    });
  });

  it('stateにtoast=logged_outの時、ログアウト完了のトーストが表示されること', async () => {
    mockUseLocation.mockReturnValue({
      state: {
        toast: 'logged_out',
      } as SignInNavState,
    });
    renderHook(() => useAuthToast());
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('ログアウトしました。');
    });
  });

  it('toastを表示した後、clearRedirectedReasonが呼ばれること', async () => {
    mockUseLocation.mockReturnValue({
      state: {
        toast: 'logged_out',
      } as SignInNavState,
    });
    renderHook(() => useAuthToast());
    await waitFor(() => {
      expect(mockClearRedirectedReason).toHaveBeenCalled();
    });
  });
});
