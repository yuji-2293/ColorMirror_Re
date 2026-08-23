import { render, screen } from '@testing-library/react';
import SignUpCard from '@/app/features/auth/components/signUpCard';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { type SignUpErrors } from '@/app/features/auth/types/authType';
import userEvent from '@testing-library/user-event';
const { mockUseSignUp } = vi.hoisted(() => ({
  mockUseSignUp: vi.fn(),
}));

vi.mock('@/app/features/auth/hooks/useSignUp', () => ({
  useSignUp: mockUseSignUp,
}));

describe('SignUpCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('errors.nameが存在する場合、エラーメッセージが表示されること', () => {
    // errors.nameにエラーメッセージをセット
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: { name: '名前は必須です' } as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('名前は必須です')).toBeInTheDocument();
  });
  it('errors.emailが存在する場合、エラーメッセージが表示されること', () => {
    // errors.emailにエラーメッセージをセット
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: { email: 'メールアドレスは必須です' } as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument();
  });
  it('errors.passwordが存在する場合、エラーメッセージが表示されること', () => {
    // errors.passwordにエラーメッセージをセット
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: { password: 'パスワードは必須です' } as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('パスワードは必須です')).toBeInTheDocument();
  });
  it('errors.password_confirmationが存在する場合、エラーメッセージが表示されること', () => {
    // errors.password_confirmationにエラーメッセージをセット
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: { password_confirmation: 'パスワード確認は必須です' } as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('パスワード確認は必須です')).toBeInTheDocument();
  });
  it('errors.formが存在する場合、エラーメッセージが表示されること', () => {
    // errors.formにエラーメッセージをセット
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: { form: 'フォーム全体のエラーです' } as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    // エラーメッセージが表示されることを確認
    expect(screen.getByText('フォーム全体のエラーです')).toBeInTheDocument();
  });

  it('Name欄に文字を入力すると、handleChangeNameが呼ばれること', async () => {
    const mockHandleChangeName = vi.fn();
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: mockHandleChangeName,
      handleChangePasswordConfirmation: vi.fn(),
      errors: {} as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    await user.type(nameInput, 'テ');
    expect(mockHandleChangeName).toHaveBeenCalledWith('テ');
  });
  it('Email欄に文字を入力すると、handleChangeEmailが呼ばれること', async () => {
    const mockHandleChangeEmail = vi.fn();
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: mockHandleChangeEmail,
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: {} as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    await user.type(emailInput, '@');
    expect(mockHandleChangeEmail).toHaveBeenCalledWith('@');
  });
  it('Password欄に文字を入力すると、handleChangePasswordが呼ばれること', async () => {
    const mockHandleChangePassword = vi.fn();
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: mockHandleChangePassword,
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: {} as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'p');
    expect(mockHandleChangePassword).toHaveBeenCalledWith('p');
  });
  it('Password確認欄に文字を入力すると、handleChangePasswordConfirmationが呼ばれること', async () => {
    const mockHandleChangePasswordConfirmation = vi.fn();
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: mockHandleChangePasswordConfirmation,
      errors: {} as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const passwordConfirmationInput = screen.getByLabelText('Password確認');
    await user.type(passwordConfirmationInput, 'c');
    expect(mockHandleChangePasswordConfirmation).toHaveBeenCalledWith('c');
  });

  it('isSubmittingがtrueの場合、登録ボタンは無効化され、ボタンの表示が「アカウント作成中...」になること', () => {
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: {} as SignUpErrors,
      isSubmitting: true,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole('button', { name: 'アカウント作成中...' });
    expect(submitButton).toBeDisabled();
  });
  it('isSubmittingがfalseの場合、登録ボタンは有効化され、ボタンの表示が「アカウント作成」になること', () => {
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: vi.fn(),
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: {} as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole('button', { name: 'アカウント作成' });
    expect(submitButton).toBeEnabled();
  });

  it('登録ボタンをクリックすると、handleSignUpが呼ばれること', async () => {
    const mockHandleSignUp = vi.fn();
    mockUseSignUp.mockReturnValue({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      handleSignUp: mockHandleSignUp,
      handleChangeEmail: vi.fn(),
      handleChangePassword: vi.fn(),
      handleChangeName: vi.fn(),
      handleChangePasswordConfirmation: vi.fn(),
      errors: {} as SignUpErrors,
      isSubmitting: false,
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SignUpCard />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const submitButton = screen.getByRole('button', { name: 'アカウント作成' });
    await user.click(submitButton);
    expect(mockHandleSignUp).toHaveBeenCalled();
  });
});
