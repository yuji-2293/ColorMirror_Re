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


## 日付け 2025/ 1/5

### 今日やったこと
- リプレイス開発の進捗と整理
  - キャッチアップ or 挙動確認済み
    - zustand
    - TanStackQuery
    - devise_token_auth
      - [x] サインアップ
      - [ ] サインイン
      - [ ] サインアウト
    - axiosによるAPI通信、クライアント処理の共通化

### 着手中
 - ユーザー認証
 - Top画面でform作成
   - 色選択してパラメーターに含めてAPI通信できるようにする
   - 色(color)のモデルへの保存ができる状態になる
 - AIコメント生成機能
   - responseモデルの保存ができる状態になる
   - 
```
### MVP
- deviseによるログイン認証
  - ログイン機能
  - ログアウト機能
- 基本CRUD
  - 色の選択form
  - 選択した色の一覧
- AIコメント生成
  - 選択した単語による色の生成
  - 選択した色を元にAI分析コメント生成


```
### 今日の学び
- async await の使い所
  - 処理した値をその場で使うなら必要
    - request responseで返値を使いたい時など
  - 処理単体で実行するだけ、なら不要
    - ログイン処理単体など
- サインアップのフロー
  - 認証のためのユーザー情報をサーバーに送信
  - サーバーからresponseを返すときにaccess-token,uid,clientにdevise_token_authが値を生成して格納してくれる
  - tokenをはじめとしたcookieに保存して以降の認証に使う情報がrequest先に返る
  - tokenの値が返ることで認証を成立させる
  - この時AxiosResponseオブジェクトを使いinterceptorを利用してcookieにaccess-token,uid,clientを保存される
  - cookieに保存した値はログインする時に使用する

- サインアウトのフロー
  - access-token,uid,clientのcookieにある値を元にrequestヘッダーを作成
  - signoutのエンドポイントにアクセス
  - サーバー側はtokenの値を無効化しレコードのtokensを削除する
  - サーバーに通信が成功したらブラウザの認証情報(cookie)を削除する

- サインインのフロー
  - name?やメールアドレス、パスワードを入力してUserからユーザー情報を検索
  - 照合が合致したらtokenを発行、Userに保存、フロントにheaderに値を付与して返す
  - headerから情報をcookieに保存

## 日付け 2025/ 1/6

### 今日やったこと

- React-router-domについて
  - URLの責務をReactに付与するライブラリ
    - このURLだったらこのページを表示する、を定義する役割
    - 構成として BrowserRouter > Routes > Route のような順番で入れ子

```
// サンプルテンプレート
// path: URLの指定
// element: ページに表示させるコンポーネントの指定
<BrowserRouter>
    <Link to="/">Home</Link> | <Link to="/about">About</Link>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Not Found Page</h1>} />
    </Routes>
</BrowserRouter>
```
