import { render, screen } from '@testing-library/react';
import SignInCard from '@/app/features/auth/components/signInCard';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { type SignInErrors } from '@/app/features/auth/types/authType';

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
  handleSignIn: () => {},
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
});
