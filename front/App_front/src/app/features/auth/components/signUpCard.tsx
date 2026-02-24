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
  // エラーの有無を判定するためのローカル変数。name、email、password、password_confirmationの各フィールドのエラーがあるかどうかを判定して、それぞれnameInvalid、emailInvalid、passwordInvalid、passwordConfirmationInvalidに真偽値をセットする。
  const nameInvalid = Boolean(errors.name);
  const emailInvalid = Boolean(errors.email);
  const passwordInvalid = Boolean(errors.password);
  const passwordConfirmationInvalid = Boolean(errors.password_confirmation);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">アカウント作成</CardTitle>
        <CardDescription>
          <p className="text-center">名前、メールアドレスを入力して登録</p>
        </CardDescription>
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
              aria-invalid={nameInvalid}
              className={nameInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''}
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
              aria-invalid={emailInvalid}
              className={emailInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''}
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
              aria-invalid={passwordInvalid}
              className={passwordInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''}
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
              aria-invalid={passwordConfirmationInvalid}
              className={
                passwordConfirmationInvalid ? 'border-red-500 focus-visible:ring-red-500' : ''
              }
              placeholder="パスワードを再入力"
            />
            {errors.password_confirmation && (
              <p className="text-sm text-red-500">{errors.password_confirmation}</p>
            )}
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={!handleSubmit || isSubmitting}>
              {isSubmitting ? 'アカウント作成中...' : 'アカウント作成'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
