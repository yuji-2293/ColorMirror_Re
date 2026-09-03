import { describe, expect, it } from 'vitest';
import { validationSignIn } from '@/app/features/auth/validations/signInValidations';
import type { SignInErrors } from '@/app/features/auth/types/authType';

describe('validationSignIn', () => {
  it('emailが空の時、エラーが返ること', () => {
    const email = '';
    const password = 'password';
    const errors: SignInErrors = validationSignIn(email, password);
    expect(errors.email).toBe('メールアドレスは必須です。');
  });
  it('emailが@を含まない時、エラーが返ること', () => {
    const email = 'testexample.com';
    const password = 'password';
    const errors: SignInErrors = validationSignIn(email, password);
    expect(errors.email).toBe('有効なメールアドレスを入力してください。');
  });
  it('passwordが空の時、エラーが返ること', () => {
    const email = '@test.com';
    const password = '';
    const errors: SignInErrors = validationSignIn(email, password);
    expect(errors.password).toBe('パスワードは必須です。');
  });
  it('passwordが6文字未満の時、エラーが返ること', () => {
    const email = '@test.com';
    const password = 'pass';
    const errors: SignInErrors = validationSignIn(email, password);
    expect(errors.password).toBe('パスワードは6文字以上である必要があります。');
  });
  it('emailとpasswordが正しい時、エラーが返らないこと', () => {
    const email = '@test.com';
    const password = 'password';
    const errors: SignInErrors = validationSignIn(email, password);
    expect(errors).toEqual({});
  });
});
