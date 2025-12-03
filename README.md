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

- レスポンシブ対応

## 🔧 技術スタック

| 分類             | 技術                     | 補足                         |
|------------------|--------------------------|------------------------------|
| フロントエンド   | React / Tailwind CSS / shadcn/ui | UI設計 |
| バックエンド     | Ruby on Rails 8.x        | Rails 8.0 / Ruby 3.2        |
| データベース     | PostgreSQL               | 本番 / 開発共通             |
| 認証             | Devise  / Google                 | ログイン認証   Google認証              |
| 非同期処理       | SolidQueue / ActiveJob   | AIコメント生成・通知処理     |
| ライブラリ          | chart.js / CalHeatmap.js swiper.js | チャートグラフ作図 / ヒートマップ作図 | スライド式form画面 |
| API連携          | OpenWeatherMap / OpenAI / LINE | 天気取得・コメント生成・通知 |
| デプロイ         | Render / Vercel                  | GitHubActions CI/CD              |
| テスト           | RSpec vitest                    | モデル・システム        |

---

## コンポーネント構成図
```
│  ├──  └──
src/  
├── app/  
│   ├── api/  
│   │   ├── colors.ts   
│   │   ├── selfLogs.ts   
│   │   ├── responses.ts  
│   │   └── users.ts  
│   ├── types/              # DBに対応した型定義    
│   │   ├───  Color.ts
│   │   ├── SelfLog.ts
│   │   ├── Response.ts
│   │   └── User.ts
│   ├── hooks/              # 共通の状態管理 or カスタムフック
│   │   ├── useFetch.ts
│   │   └── useToast.ts
│   └── store/              # Zustand
│
├── components/             # UI部品（再利用可能）
│   ├── ui/                 # ボタン・入力・モーダルなどの共通UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── header.tsx 
│   │   ├── footer.tsx 
│   │   └── Toast.tsx
│   ├── layout/             # 共通レイアウト
│   │   ├── 
│   │   ├── 
│   │   └── Container.tsx
│   ├── colors/             # 色関連のUI部品
│   │   ├── ColorCard.tsx
│   │   └── ColorList.tsx
│   ├── logs/               # 記録関連のUI部品
│   │   ├── LogForm.tsx
│   │   └── LogList.tsx
│
│
│
│
├── pages/                  # 実際の画面（URLごと）
│   ├── ColorsPage.tsx      # /colors
│   ├── LogsPage.tsx        # /logs
│   ├── DashboardPage.tsx   # /dashboard（後で  ）
│   └── UserPage.tsx        # /user（プロフィール表示など）
│
├── App.tsx                 # ルーティング・全体構成
├── main.tsx                # エントリポイント
└── index.css               # Tailwindエントリ
```
