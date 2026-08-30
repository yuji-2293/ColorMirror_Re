import { waitFor, renderHook, act } from '@testing-library/react';
import { useSignIn } from '@/app/features/auth/hooks/useSignIn';
import { toast } from 'sonner';
import { describe, it, vi } from 'vitest';
import { type SignInNavState } from '@/app/features/auth/types/authType';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const { mockUseNavigate, mockUseLocation } = vi.hoisted(() => ({
  mockUseNavigate: vi.fn(),
  mockUseLocation: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUseNavigate,
  useLocation: mockUseLocation,
}));

const mockSignIn = vi.hoisted(() => vi.fn());
vi.mock('@/app/features/auth/api/auth', () => ({
  signIn: mockSignIn,
}));

const mockLogin = vi.hoisted(() => vi.fn());
vi.mock('@/app/store/useAuthStore', () => ({
  useAuthStore: vi.fn((state) =>
    state({
      login: mockLogin,
    })
  ),
}));

describe('useSignIn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLocation.mockReturnValue({
      state: {
        email: '',
      } as SignInNavState,
    });
  });

  describe('入力変更のテスト', () => {
    it('handleChangeEmailを呼ぶと、emailの値が更新される', async () => {
      const { result } = renderHook(() => useSignIn());
      result.current.handleChangeEmail('@test.com');
      await waitFor(() => {
        expect(result.current.email).toBe('@test.com');
      });
    });
    it('handleChangeEmailを呼ぶと、emailとformのエラーがクリアされる', async () => {
      const { result } = renderHook(() => useSignIn());
      act(() => {
        result.current.setErrors({ email: 'error', form: 'error' });
        result.current.handleChangeEmail('@test.com');
      });
      expect(result.current.errors.email).toBeUndefined();
      expect(result.current.errors.form).toBeUndefined();
    });

    it('handleChangePasswordを呼ぶと、passwordの値が更新される', async () => {
      const { result } = renderHook(() => useSignIn());
      result.current.handleChangePassword('password');
      await waitFor(() => {
        expect(result.current.password).toBe('password');
      });
    });
    it('handleChangePasswordを呼ぶと、passwordとformのエラーがクリアされる', async () => {
      const { result } = renderHook(() => useSignIn());
      act(() => {
        result.current.setErrors({ password: 'error', form: 'error' });
        result.current.handleChangePassword('password');
      });
      expect(result.current.errors.password).toBeUndefined();
      expect(result.current.errors.form).toBeUndefined();
    });
    it('location.stateにemailがある場合、emailの初期値が設定される', async () => {
      mockUseLocation.mockReturnValue({
        state: {
          email: '@test.com',
        } as SignInNavState,
      });
      const { result } = renderHook(() => useSignIn());
      await waitFor(() => {
        expect(result.current.email).toBe('@test.com');
      });
    });
  });
  describe('submitのテスト', () => {
    it('フィールドの値が1つでも空の場合、handleSubmitはfalseになる', async () => {
      const { result } = renderHook(() => useSignIn());
      act(() => {
        result.current.handleChangeEmail('');
        result.current.handleChangePassword('password');
      });
      await waitFor(() => {
        expect(result.current.handleSubmit).toBe(false);
      });
    });
    it('全フィールドに値がある場合、handleSubmitはtrueになる', async () => {
      const { result } = renderHook(() => useSignIn());
      act(() => {
        result.current.handleChangeEmail('@test.com');
        result.current.handleChangePassword('password');
      });
      await waitFor(() => {
        expect(result.current.handleSubmit).toBe(true);
      });
    });
    it('signInが成功した場合、loginが呼ばれる', async () => {
      const { result } = renderHook(() => useSignIn());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.handleChangeEmail('@test.com');
        result.current.handleChangePassword('password');
      });
      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });
      expect(mockSignIn).toHaveBeenCalled();
    });
  });
  describe('validationのテスト', () => {
    it('validationSignIn関数がErrorsに格納されると、処理が中断される', async () => {
      const { result } = renderHook(() => useSignIn());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.handleChangeEmail('');
        result.current.handleChangePassword('password');
      });
      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });
      expect(result.current.errors.email).toBeDefined();
      expect(mockSignIn).not.toHaveBeenCalled();
    });
  });
  describe('API通信のテスト', () => {
    it('signInが失敗した場合、エラーとtoast.errorが表示される', async () => {
      const { result } = renderHook(() => useSignIn());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.handleChangeEmail('@test.com');
        result.current.handleChangePassword('password');
      });
      mockSignIn.mockRejectedValueOnce(new Error('API error'));
      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });
      expect(result.current.errors.form).toBeDefined();
      expect(toast.error).toHaveBeenCalledWith(
        'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
      );
    });
    it('signInが成功したらtoast.successが表示される', async () => {
      const { result } = renderHook(() => useSignIn());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.handleChangeEmail('@test.com');
        result.current.handleChangePassword('password');
      });
      mockSignIn.mockResolvedValueOnce({
        data: {
          data: {
            id: 1,
            name: 'test',
          },
        },
      });
      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });
      expect(toast.success).toHaveBeenCalledWith('ログインに成功しました。');
    });

    it('signInが成功した場合、storeのloginが呼ばれる', async () => {
      const { result } = renderHook(() => useSignIn());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.handleChangeEmail('@test.com');
        result.current.handleChangePassword('password');
      });
      mockSignIn.mockResolvedValueOnce({
        data: {
          data: {
            id: 1,
            name: 'test',
          },
        },
      });
      await act(async () => {
        await result.current.handleLogin(mockEvent);
      });
      expect(mockLogin).toHaveBeenCalledWith({ id: 1, name: 'test' });
    });
  });
});
