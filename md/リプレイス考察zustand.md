なぜContext APIではなくzustandだったのか?

Context API の長所・短所
Context API を使用するかどうかを検討する際に役立つ、主な長所と短所をまとめます。

長所
ネイティブ機能: React に組み込まれているため、追加ライブラリが不要
プロップドリリング解消: コンポーネント階層を通じて props を渡す必要がない
シンプルな API: 学習コストが低く、すぐに導入できる
軽量: バンドルサイズへの影響が最小限
短所
パフォーマンスの最適化が難しい: Context 値が変更されると、すべての消費コンポーネントが再レンダリングされる
大規模アプリでは再レンダリングが多発する可能性: 適切に設計しないと不要な再レンダリングが発生する
デバッグツールが限られている: 専用の状態管理ライブラリのような強力なデバッグツールがない
複雑な状態ロジックには不向き: 非同期処理や複雑な状態更新には不向き

将来的には非推奨となる


ディレクトリ構成
/
├─ public
│  └─ vite.svg
├─ src
│  ├─ app
│  │  ├─ assets
│  │  ├─ features
│  │  ├─ lig
│  │  └─ store
│  │     └─ useAuthStore.ts
│  ├─ assets
│  │  └─ react.svg
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
