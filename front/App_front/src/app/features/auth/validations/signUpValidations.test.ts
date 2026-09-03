import { describe, expect, it } from 'vitest';
import { validationSignUp } from '@/app/features/auth/validations/signUpValidations';
import type { SignUpErrors } from '@/app/features/auth/types/authType';

describe('validationSignUp', () => {
  it('nameが空の時、エラーが返ること', () => {
    const name = '';
    const email = 'example@example.com';
    const password = 'password';
    const password_confirmation = 'password';
    const errors: SignUpErrors = validationSignUp(name, email, password, password_confirmation);
    expect(errors.name).toBe('名前は必須です。');
  });
  it('emailが空の時、エラーが返ること', () => {
    const name = 'test';
    const email = '';
    const password = 'password';
    const password_confirmation = 'password';
    const errors: SignUpErrors = validationSignUp(name, email, password, password_confirmation);
    expect(errors.email).toBe('メールアドレスは必須です。');
  });
  it('emailが@を含まない時、エラーが返ること', () => {
    const name = 'test';
    const email = 'testexample.com';
    const password = 'password';
    const password_confirmation = 'password';
    const errors: SignUpErrors = validationSignUp(name, email, password, password_confirmation);
    expect(errors.email).toBe('有効なメールアドレスを入力してください。');
  });
  it('passwordが空の時、エラーが返ること', () => {
    const name = 'test';
    const email = '@test.com';
    const password = '';
    const password_confirmation = '';
    const errors: SignUpErrors = validationSignUp(name, email, password, password_confirmation);
    expect(errors.password).toBe('パスワードは必須です。');
  });
  it('passwordが6文字未満の時、エラーが返ること', () => {
    const name = 'test';
    const email = '@test.com';
    const password = 'pass';
    const password_confirmation = 'pass';
    const errors: SignUpErrors = validationSignUp(name, email, password, password_confirmation);
    expect(errors.password).toBe('パスワードは6文字以上である必要があります。');
  });
  it('passwordとpassword_confirmationが一致しない時、エラーが返ること', () => {
    const name = 'test';
    const email = '@test.com';
    const password = 'password';
    const password_confirmation = 'password1';
    const errors: SignUpErrors = validationSignUp(name, email, password, password_confirmation);
    expect(errors.password_confirmation).toBe('パスワードと確認用パスワードが一致しません。');
  });
  it('name、email、password、password_confirmationが正しい時、エラーが返らないこと', () => {
    const name = 'test';
    const email = '@test.com';
    const password = 'password';
    const password_confirmation = 'password';
    const errors: SignUpErrors = validationSignUp(name, email, password, password_confirmation);
    expect(errors).toEqual({});
  });
});
