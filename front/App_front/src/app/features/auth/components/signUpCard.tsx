import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUp } from '@/app/features/auth/hooks/useSignUp';
import { useAuthToast } from '@/app/features/auth/hooks/useAuthToasts';

export default function SignUpCard() {
  useAuthToast();
  // カスタムフックから状態と関数を取得
  const {
    name,
    email,
    password,
    password_confirmation,
    handleSignUp,
    handleChangeEmail,
    handleChangePassword,
    handleChangeName,
    handleChangePasswordConfirmation,
    errors,
    isSubmitting,
    handleSubmit,
  } = useSignUp();

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
            {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => handleChangeName(e.target.value)}
              placeholder="名前を入力"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
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
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Password確認</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              onChange={(e) => handleChangePasswordConfirmation(e.target.value)}
              placeholder="パスワードを再入力"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">{errors.password_confirmation}</p>
            )}
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={!handleSubmit || isSubmitting}>
              アカウントを作成
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
