// 出力用の型定義
export interface AuthUser {
  id: number;
  email: string;
  uid: string;
  provider: string;
  allowPasswordChange: boolean;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
// 入力用の型定義
export interface AuthParams {
  email: string;
  password: string;
  password_confirmation?: string;
  name?: string;
}
