# 学習記録用ファイル

## 日付け 2025/ 1/1

### 今日やったこと
- ユーザー認証でテスト挙動を実装した振り返り
- devise_token_authでトークン認証を実装(cookie主体)
  - axiosの型定義では「入力用」と「返却用」で分ける必要がある

```
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
```

### なぜか？
 - 入力用
   - form由来
   - ユーザー作成前なので、id/uid/provider等はまだ未作成なため、今項目には型定義は必要ない
 - 返却用
    - サーバーに由来する
    - 認証後に作成されている項目に対しての型定義が必要

axios の ```<T>``` は response.data の型  
axios は AxiosResponse```<T>```を返す  
→axios.get ```<T>```(...)が戻り値 = ``` Promise<AxiosResponse<T>> ```
