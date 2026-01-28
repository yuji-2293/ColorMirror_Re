import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type AuthParams } from '@/app/features/auth/types/authType';
import { signUp } from '@/app/features/auth/api/auth';
export const SignUp = () => {
  // ユーザー登録用の状態管理state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  // ユーザー登録用パラメータ
  const params: AuthParams = {
    name,
    email,
    password,
    password_confirmation: password_confirmation,
  };

  // サインアップ処理(signUp api呼び出し)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // passwordとpassword_confirmationが一致するか確認
    if (password !== password_confirmation) {
      alert('パスワードとパスワード確認が一致しません。');
      return;
    }

    try {
      await signUp(params);
      alert('ユーザー登録が完了しました。サインインしてください。');
      navigate('/signin');
    } catch (error) {
      alert('ユーザー登録に失敗しました。');
      console.error(error);
    }
  };

  return (
    <div className="Register">
      <h1>アカウント新規登録画面</h1>
      <form onSubmit={handleSignUp} className="Form">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="確認パスワード"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};
