import { useState } from 'react';
import { useAuthStore } from '@/app/store/useAuthStore';
import { type AuthParams } from '@/app/features/auth/types/authType';
import { signIn } from '@/app/features/auth/api/auth';
export const SignIn = () => {
  // ログイン用の状態管理state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ログイン用パラメータ
  const params: AuthParams = {
    email,
    password,
  };
  // zustand の状態管理で使用するためのstateと関数
  const login = useAuthStore((state) => state.login);
  // サインイン処理(signIn api呼び出し後、zustandのlogin関数を実行)
  const handleLogin = async () => {
    const res = await signIn(params);
    const resUser = res.data.data;
    const Id = resUser.id;
    const Name = resUser.name;
    login({ id: Id, name: Name });
  };
  return (
    <div>
      <h2>Sign In Page</h2>
      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  );
};
