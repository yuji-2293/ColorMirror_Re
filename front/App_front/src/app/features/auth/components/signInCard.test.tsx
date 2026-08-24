import { render, screen } from '@testing-library/react';
import SignInCard from '@/app/features/auth/components/signInCard';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { type SignInErrors } from '@/app/features/auth/types/authType';
import userEvent from '@testing-library/user-event';
const memoryComponent = () => {
  return render(
    <MemoryRouter>
      <SignInCard />
    </MemoryRouter>
  );
};

const defaultUseSignIn = {
  email: '',
  password: '',
  form: '',
  handleLogin: () => {},
  handleChangeEmail: () => {},
  handleChangePassword: () => {},
  isSubmitting: false,
  handleSubmit: () => true,
  errors: {} as SignInErrors,
};

const mockUseSignIn = vi.fn(() => defaultUseSignIn);

vi.mock('@/app/features/auth/hooks/useSignIn', () => ({
  useSignIn: () => mockUseSignIn(),
}));

describe('SignInCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('errors.emailが存在する場合、エラーメッセージが表示されること', () => {
    // errors.emailにエラーメッセージをセット
    mockUseSignIn.mockReturnValue({
      ...defaultUseSignIn,
      errors: { email: 'メールアドレスは必須です' } as SignInErrors,
    });
    memoryComponent();
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument();
  });
  it('errors.passwordが存在する場合、エラーメッセージが表示されること', () => {
    // errors.passwordにエラーメッセージをセット
    mockUseSignIn.mockReturnValue({
      ...defaultUseSignIn,
      errors: { password: 'パスワードは必須です' } as SignInErrors,
    });
    memoryComponent();
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('パスワードは必須です')).toBeInTheDocument();
  });
  it('errors.formが存在する場合、エラーメッセージが表示されること', () => {
    // errors.formにエラーメッセージをセット
    mockUseSignIn.mockReturnValue({
      ...defaultUseSignIn,
      errors: { form: 'メールアドレスまたはパスワードが間違っています' } as SignInErrors,
    });
    memoryComponent();
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('メールアドレスまたはパスワードが間違っています')).toBeInTheDocument();
  });

  it('Email欄に文字を入力すると、handleChangeEmailが呼ばれること', async () => {
    const mockHandleChangeEmail = vi.fn();
    mockUseSignIn.mockReturnValue({
      ...defaultUseSignIn,
      handleChangeEmail: mockHandleChangeEmail,
    });
    memoryComponent();
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, '@');
    expect(mockHandleChangeEmail).toHaveBeenCalledWith('@');
  });

  it('Password欄に文字を入力すると、handleChangePasswordが呼ばれること', async () => {
    const mockHandleChangePassword = vi.fn();
    mockUseSignIn.mockReturnValue({
      ...defaultUseSignIn,
      handleChangePassword: mockHandleChangePassword,
    });
    memoryComponent();
    const user = userEvent.setup();
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'a');
    expect(mockHandleChangePassword).toHaveBeenCalledWith('a');
  });

  it('formが送信されると、「ログイン」ボタンがクリックされ、handleSignInが呼ばれること', async () => {
    const mockHandleSignIn = vi.fn();
    mockUseSignIn.mockReturnValue({
      ...defaultUseSignIn,
      isSubmitting: false,
      handleLogin: mockHandleSignIn,
    });
    memoryComponent();
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: 'ログイン' });
    await user.click(submitButton);
    expect(submitButton).toBeInTheDocument();
    expect(mockHandleSignIn).toHaveBeenCalled();
  });
  it('isSubmittingがtrueの場合,ボタンが「ログイン中...」になること', () => {
    mockUseSignIn.mockReturnValue({
      ...defaultUseSignIn,
      isSubmitting: true,
    });
    memoryComponent();
    const submitButton = screen.getByRole('button', { name: 'ログイン中...' });
    expect(submitButton).toBeInTheDocument();
  });
});
