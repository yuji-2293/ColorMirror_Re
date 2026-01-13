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
