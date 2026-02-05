import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type AuthParams } from '@/app/features/auth/types/authType';
import { signUp } from '@/app/features/auth/api/auth';
import { useNavigate } from 'react-router-dom';

export default function SignUpCard() {
  // ユーザー登録用の状態管理state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  // サインアップ処理(signUp api呼び出し)
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
      navigate('/signin');
    } catch (error) {
      alert('ユーザー登録に失敗しました。');
      console.error(error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">アカウント作成</CardTitle>
        <CardDescription>メールアドレスを入力して登録</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前を入力"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Password確認</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="パスワードを再入力"
            />
          </div>
          <CardFooter>
            <Button type="submit" className="w-full">
              アカウントを作成
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
