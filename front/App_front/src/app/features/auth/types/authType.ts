// 出力用の型定義(ドメインモデル)
export interface AuthUser {
  id: number;
  email: string;
  uid: string;
  provider: string;
  allowPasswordChange: boolean;
  name?: string;
}
// 入力用の型定義
export interface AuthParams {
  email: string;
  password: string;
  password_confirmation?: string;
  name?: string;
}

// APIレスポンス用の型定義
export interface ValidateTokenResponse {
  success: boolean;
  data: AuthUser;
}
// サインイン後のリダイレクトで、メールアドレスやトースト表示の情報を受け取るための型定義
export interface SignInNavState {
  toast?: 'login_require' | 'logged_out';
  from?: string;
  email?: string;
}

export interface SignInErrors {
  email?: string;
  password?: string;
  form?: string;
}
