import { waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { useSignUp } from '@/app/features/auth/hooks/useSignUp';
import { renderHook, act } from '@testing-library/react';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
const { mockUseNavigate } = vi.hoisted(() => ({
  mockUseNavigate: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUseNavigate,
}));

const mockSignUp = vi.hoisted(() => vi.fn());
vi.mock('@/app/features/auth/api/auth', () => ({
  signUp: mockSignUp,
}));

describe('useSignUp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('入力変更のテスト', () => {
    it('handleChangeEmailを呼ぶと、emailの値が更新される', async () => {
      const { result } = renderHook(() => useSignUp());
      result.current.handleChangeEmail('@test.com');
      await waitFor(() => {
        expect(result.current.email).toBe('@test.com');
      });
    });
    it('handleChangeEmailを呼ぶと、emailとformのエラーがクリアされる', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setErrors({ email: 'error', form: 'error' });
        result.current.handleChangeEmail('@test.com');
      });
      expect(result.current.errors.email).toBeUndefined();
      expect(result.current.errors.form).toBeUndefined();
    });

    it('handleChangePasswordを呼ぶと、passwordの値が更新される', async () => {
      const { result } = renderHook(() => useSignUp());
      result.current.handleChangePassword('password');
      await waitFor(() => {
        expect(result.current.password).toBe('password');
      });
    });
    it('handleChangePasswordを呼ぶと、passwordとformのエラーがクリアされる', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setErrors({ password: 'error', form: 'error' });
        result.current.handleChangePassword('password');
      });
      expect(result.current.errors.password).toBeUndefined();
      expect(result.current.errors.form).toBeUndefined();
    });
    it('handleChangeNameを呼ぶと、nameの値が更新される', async () => {
      const { result } = renderHook(() => useSignUp());
      result.current.handleChangeName('name');
      await waitFor(() => {
        expect(result.current.name).toBe('name');
      });
    });
    it('handleChangeNameを呼ぶと、nameとformのエラーがクリアされる', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setErrors({ name: 'error', form: 'error' });
        result.current.handleChangeName('name');
      });
      expect(result.current.errors.name).toBeUndefined();
      expect(result.current.errors.form).toBeUndefined();
    });
    it('handleChangePasswordConfirmationを呼ぶと、password_confirmationの値が更新される', async () => {
      const { result } = renderHook(() => useSignUp());
      result.current.handleChangePasswordConfirmation('password_confirmation');
      await waitFor(() => {
        expect(result.current.password_confirmation).toBe('password_confirmation');
      });
    });
    it('handleChangePasswordConfirmationを呼ぶと、password_confirmationとformのエラーがクリアされる', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setErrors({ password_confirmation: 'error', form: 'error' });
        result.current.handleChangePasswordConfirmation('password_confirmation');
      });
      expect(result.current.errors.password_confirmation).toBeUndefined();
      expect(result.current.errors.form).toBeUndefined();
    });
  });
  describe('submitの制御テスト', () => {
    it('全フィールドに値がある場合、handleSubmitはtrueを返す', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setName('name');
        result.current.setEmail('email');
        result.current.setPassword('password');
        result.current.setPasswordConfirmation('password_confirmation');
      });
      await waitFor(() => {
        expect(result.current.handleSubmit).toBe(true);
      });
    });
    it('いずれかのフィールドが空の場合、handleSubmitはfalseを返す', async () => {
      const { result } = renderHook(() => useSignUp());
      act(() => {
        result.current.setName('name');
        result.current.setEmail('');
        result.current.setPassword('password');
        result.current.setPasswordConfirmation('password_confirmation');
      });
      await waitFor(() => {
        expect(result.current.handleSubmit).toBe(false);
      });
    });
  });
  describe('validationのテスト', () => {
    it('validationSignUp関数がErrorsに格納されると、処理が中断される', async () => {
      const { result } = renderHook(() => useSignUp());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

      await act(async () => {
        await result.current.handleSignUp(mockEvent);
      });
      expect(result.current.errors.name).toBeDefined();
      expect(mockSignUp).not.toHaveBeenCalled();
    });
    it('passwordとpassword_confirmationが一致しない場合、処理が中断される', async () => {
      const { result } = renderHook(() => useSignUp());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.setName('name');
        result.current.setEmail('email');
        result.current.setPassword('password');
        result.current.setPasswordConfirmation('different_password');
      });
      await act(async () => {
        await result.current.handleSignUp(mockEvent);
      });
      expect(result.current.errors.password_confirmation).toBeDefined();
      expect(mockSignUp).not.toHaveBeenCalled();
    });
  });
  describe('API通信のテスト', () => {
    it('signUPが成功した場合、navigateが呼ばれる', async () => {
      const { result } = renderHook(() => useSignUp());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.setName('name');
        result.current.setEmail('@email.com');
        result.current.setPassword('password');
        result.current.setPasswordConfirmation('password');
      });
      await act(async () => {
        await result.current.handleSignUp(mockEvent);
      });
      expect(mockSignUp).toHaveBeenCalled();
      expect(mockUseNavigate).toHaveBeenCalledWith('/signin', { state: { email: '@email.com' } });
    });
    it('signUPが失敗した場合、エラーとtoast.errorが表示される', async () => {
      const { result } = renderHook(() => useSignUp());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      act(() => {
        result.current.setName('name');
        result.current.setEmail('@email.com');
        result.current.setPassword('password');
        result.current.setPasswordConfirmation('password');
      });
      mockSignUp.mockRejectedValueOnce(new Error('API error'));
      await act(async () => {
        await result.current.handleSignUp(mockEvent);
      });
      expect(result.current.errors.form).toBeDefined();
      expect(toast.error).toHaveBeenCalledWith('ユーザー登録に失敗しました');
    });
    it('isSubmittingがtrueの場合、handleSignUpは処理を中断する', async () => {
      const { result } = renderHook(() => useSignUp());
      const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
      mockSignUp.mockImplementation(() => new Promise(() => {})); // 解決しないPromiseを返す
      // 正常に入力値をセットして、handleSignUpを呼び出す
      act(() => {
        result.current.setName('name');
        result.current.setEmail('@email.com');
        result.current.setPassword('password');
        result.current.setPasswordConfirmation('password');
      });
      // 1回目の呼び出しでisSubmittingがtrueになることを確認する
      act(() => {
        result.current.handleSignUp(mockEvent);
      });
      await waitFor(async () => {
        expect(result.current.isSubmitting).toBe(true);
      });
      // 2回目の呼び出しで、mockSignUpが呼ばれないことを確認する
      act(() => {
        result.current.handleSignUp(mockEvent);
      });
      expect(mockSignUp).toHaveBeenCalledTimes(1);
    });
  });
});
