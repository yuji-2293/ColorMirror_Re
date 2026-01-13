import { ApiClient } from '@/app/lib/apiClient';
import { type AuthParams, type ValidateTokenResponse } from '@/app/features/auth/types/authType';
import Cookies from 'js-cookie';
// サインアップ
export const signUp = (params: AuthParams) => {
  return ApiClient.post('/auth', { registration: params });
};

// サインイン
export const signIn = (params: AuthParams) => {
  return ApiClient.post('/auth/sign_in', params);
};

// サインアウト
export const signOut = async () => {
  const response = await ApiClient.delete('/auth/sign_out');
  // クッキーから認証情報を削除
  Cookies.remove('_access-token');
  Cookies.remove('_client');
  Cookies.remove('_uid');

  return response;
};

// 現在のユーザー情報を取得
export const validateToken = async (): Promise<ValidateTokenResponse> => {
  const response = await ApiClient.get<ValidateTokenResponse>('/auth/validate_token');
  return response.data;
};
