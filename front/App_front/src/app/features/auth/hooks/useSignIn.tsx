import { useState } from 'react';
import { type AuthParams } from '@/app/features/auth/types/authType';
import { signIn } from '@/app/features/auth/api/auth';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
import { toast } from 'sonner';
import { type SignInNavState } from '@/app/features/auth/types/authType';

export const useSignIn = () => {
  const location = useLocation();
  // locationを型安全に扱うためのローカル変数。サインイン後のリダイレクトで、メールアドレスやトースト表示の情報を受け取るために使用。
  const localState = location.state as SignInNavState;
  // location.stateからemailを初期値として取得。サインイン後のリダイレクトで、signUpから遷移してきた場合に、メールアドレスを表示するために使用。location.stateにemailがない場合は、空文字を初期値とする。
  const initialEmail = localState?.email || '';
  const [email, setEmail] = useState(initialEmail);
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
      toast.error('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      console.error('ログインエラー:', error);
    }
  };

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};
