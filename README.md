## 👩‍💻機能選定

### MVP
- deviseによるログイン認証
  - ログイン機能
  - ログアウト機能
- 基幹機能（CRUD + AIコメント生成）
  - color
    - 気分の選択
    - 選択した単語による色の生成
    - 生成したcolor選択と保存
  - response
    - 選択した色を元にAI分析コメント生成
    - 生成したコメントの保存
  - 各種保存したcolorとresponseの一覧表示
- 通知機能
  - 各アクションを[toast]を使用して通知表示
### 本リリース
- 天気APIによる天気情報の表示
  - 登録したユーザー情報をもとに天気情報を自動表示
  - 天気情報を自動でformに組み込み、API側で保存。AIコメントに反映させる。
- レスポンシブ対応

## 🔧 技術スタック

| 分類             | 技術                     | 補足                         |
|------------------|--------------------------|------------------------------|
| フロントエンド   | React　＋vite + TS + Tailwind CSS / shadcn/ui | UI設計 |
| バックエンド     | Ruby on Rails 8.x   APIモード     | Rails 8.0 / Ruby 3.2        |
| 状態管理 |  zustand |
| サーバー状態管理 | TanStack Query(React Query) |
| データベース     | PostgreSQL               | 本番 / 開発共通             |
| 認証             |  devise    devise_token_auth           |
| AIコメント生成・通知処理     | OpenAI API |
| API連携          | OpenAI /  コメント生成 |
| インフラ         | Render / Vercel |
| CI/CD           | GitHubActions 

---
