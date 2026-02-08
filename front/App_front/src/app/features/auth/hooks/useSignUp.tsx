import { type AuthParams } from '@/app/features/auth/types/authType';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/app/features/auth/api/auth';

export const useSignUp = () => {
  // ユーザー登録用の状態管理state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // passwordとpassword_confirmationが一致するか確認
    if (password !== password_confirmation) {
      alert('パスワードとパスワード確認が一致しません。');
      return;
    }

    // ユーザー登録用パラメータ
    const params: AuthParams = {
      name,
      email,
      password,
      password_confirmation: password_confirmation,
    };
    try {
      await signUp(params);
      alert('ユーザー登録が完了しました。サインインしてください。');
      navigate('/signin', { state: { email } });
    } catch (error) {
      alert('ユーザー登録に失敗しました。');
      console.error(error);
    }
  };
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    password_confirmation,
    setPasswordConfirmation,
    handleSignUp,
  };
};
