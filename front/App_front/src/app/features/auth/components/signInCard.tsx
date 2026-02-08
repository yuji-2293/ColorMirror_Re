import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignIn } from '@/app/features/auth/hooks/useSignIn';
export default function SignInCard() {
  // カスタムフックから状態と関数を取得
  const { email, setEmail, password, setPassword, handleLogin } = useSignIn();
  return (
    <div className="FormUI">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SignIn</CardTitle>
          <CardDescription>メールアドレスとパスワードを入力してサインイン</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
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
            <div>
              <Button type="submit" className="w-full">
                サインイン
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
