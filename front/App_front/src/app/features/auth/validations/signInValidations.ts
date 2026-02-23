import { type SignInErrors } from '@/app/features/auth/types/authType';

export const validationSignIn = (email: string, password: string): SignInErrors => {
  const errors: SignInErrors = {};
  // メールアドレスのバリデーション
  if (!email.trim()) {
    errors.email = 'メールアドレスは必須です。';
  } else if (!email.includes('@')) {
    errors.email = '有効なメールアドレスを入力してください。';
  }
  // パスワードのバリデーション
  if (!password) {
    errors.password = 'パスワードは必須です。';
  } else if (password.length < 6) {
    errors.password = 'パスワードは6文字以上である必要があります。';
  }
  return errors;
};
