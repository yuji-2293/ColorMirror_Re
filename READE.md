## 👩‍💻機能選定

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
- 天気APIによる天気情報の表示
  - 登録したユーザー情報をもとに天気情報を自動表示

### 本リリース
- deviseによるユーザー機能
  - パスワードの編集機能
  - メールアドレス編集機能
  - 居住都市編集機能
  - ユーザー退会機能

- 非同期処理（SolidQueue）によるキューイングジョブ
- LINE連携 or 通知によるリマインダ機能
- Google連携 or 認証によるログイン
- CalHeatmap.jsによるグラフ作図
- chart.jsによるグラフ作図
- swiper.jsによるスライド式form画面
- 静的OGP
- Googleフォームによるお問い合わせ機能
- 利用規約
- プライバシーポリシー
- レスポンシブ対応

## 🔧 技術スタック

| 分類             | 技術                     | 補足                         |
|------------------|--------------------------|------------------------------|
| フロントエンド   | React / Tailwind CSS | UI設計 |
| バックエンド     | Ruby on Rails 8.x        | Rails 8.0 / Ruby 3.2        |
| データベース     | PostgreSQL               | 本番 / 開発共通             |
| 認証             | Devise  / Google                 | ログイン認証   Google認証              |
| 非同期処理       | SolidQueue / ActiveJob   | AIコメント生成・通知処理     |
| ライブラリ          | chart.js / CalHeatmap.js swiper.js | チャートグラフ作図 / ヒートマップ作図 | スライド式form画面 |
| API連携          | OpenWeatherMap / OpenAI / LINE | 天気取得・コメント生成・通知 |
| デプロイ         | Render / Vercel                  | GitHub連携CI/CD              |
| テスト           | RSpec vitest                    | モデル・システム        |

---
