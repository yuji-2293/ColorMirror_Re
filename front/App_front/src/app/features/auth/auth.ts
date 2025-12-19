import { ApiClient } from '@/app/lib/apiClient';
import Cookies from 'js-cookie';
import { type AuthType } from '@/app/features/colors/types/authType';
// サインアップ
export const signUp = (params: AuthType) => {
  return ApiClient.post('/auth', params);
};

// サインイン
export const signIn = (params: AuthType) => {
  return ApiClient.post('/auth/sign_in', params);
};

// サインアウト
export const signOut = () => {
  return ApiClient.delete('/auth/sign_out', {
    headers: {
      'access-token': Cookies.get('access-token') || '',
      client: Cookies.get('client') || '',
      uid: Cookies.get('uid') || '',
    },
  });
};

// ログインユーザーの取得
export const getCurrentUser = () => {
  if (!Cookies.get('access-token') || !Cookies.get('client') || !Cookies.get('uid')) return;
  return ApiClient.get<AuthType>('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('access-token') || '',
      client: Cookies.get('client') || '',
      uid: Cookies.get('uid') || '',
    },
  });
};
