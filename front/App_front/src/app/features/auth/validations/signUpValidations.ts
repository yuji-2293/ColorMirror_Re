import { type SignUpErrors } from '@/app/features/auth/types/authType';

export const validationSignUp = (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): SignUpErrors => {
  const errors: SignUpErrors = {};
  // 名前のバリデーション
  if (!name.trim()) {
    errors.name = '名前は必須です。';
  }
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
  // パスワード確認のバリデーション
  if (password !== password_confirmation) {
    errors.password_confirmation = 'パスワードと確認用パスワードが一致しません。';
  }
  return errors;
};
