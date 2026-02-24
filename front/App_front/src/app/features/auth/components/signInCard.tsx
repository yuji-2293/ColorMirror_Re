import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignIn } from '@/app/features/auth/hooks/useSignIn';
import { useAuthToast } from '@/app/features/auth/hooks/useAuthToasts';
export default function SignInCard() {
  useAuthToast();
  // カスタムフックから状態と関数を取得
  const {
    email,
    password,
    handleLogin,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
    isSubmitting,
    errors,
  } = useSignIn();
  return (
    <div className="FormUI">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">ログイン画面</CardTitle>
          <CardDescription>
            <p className="text-center">メールアドレスとパスワードを入力してサインイン</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleChangeEmail(e.target.value)}
                placeholder="メールアドレスを入力"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handleChangePassword(e.target.value)}
                placeholder="パスワードを入力"
              />
            </div>
            <div>
              <Button type="submit" disabled={!handleSubmit || isSubmitting} className="w-full">
                {isSubmitting ? 'ログイン中...' : 'ログイン'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
