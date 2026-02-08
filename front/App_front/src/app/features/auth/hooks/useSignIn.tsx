import { useState } from 'react';
import { type AuthParams } from '@/app/features/auth/types/authType';
import { signIn } from '@/app/features/auth/api/auth';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
import { toast } from 'sonner';

export const useSignIn = () => {
  // サインイン用のロジック
  // リダイレクト元からemailが渡されていればセットする
  const location = useLocation();
  const emailFromState = (location.state as { email?: string } | null)?.email;
  const [email, setEmail] = useState(emailFromState || '');
  const toastState = (location.state as { toast?: string } | null)?.toast;
  if (toastState === 'unauthorized') {
    toast.error('ログインが必要です。');
  }

  // 登録成功後ログイン成功時にトースト表示
  if (emailFromState) {
    toast.success('登録が完了しました。ログインしてください。');
  }
  // ログイン用のpassword状態管理
  const [password, setPassword] = useState('');
  // zustand の状態管理で使用するためのstateと関数
  const login = useAuthStore((state) => state.login);
  // サインイン処理(signIn api呼び出し後、zustandのlogin関数を実行)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ログイン用パラメータ
      const params: AuthParams = {
        email,
        password,
      };
      const res = await signIn(params);
      const resUser = res.data.data;
      const id = resUser.id;
      const name = resUser.name;
      console.log('ログイン成功:', id, name);
      toast.success('ログインに成功しました。');
      // フロント側をログイン状態にする
      login({ id: id, name: name });
    } catch (error) {
      alert('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      console.error('ログインエラー:', error);
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};
