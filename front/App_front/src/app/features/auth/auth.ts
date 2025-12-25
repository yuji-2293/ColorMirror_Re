import { ApiClient } from '@/app/lib/apiClient';
import { type AuthUser } from '@/app/features/colors/types/authType';
import { type AuthParams } from '@/app/features/colors/types/authType';
// サインアップ
export const signUp = (params: AuthParams) => {
  return ApiClient.post('/auth', { registration: params });
};

// サインイン
export const signIn = (params: AuthUser) => {
  return ApiClient.post('/auth/sign_in', params);
};

// サインアウト
export const signOut = () => {
  return ApiClient.delete('/auth/sign_out');
};

// 現在のユーザー情報を取得
export const validateToken = () => {
  return ApiClient.get('/auth/validate_token');
};
