# 学習記録用ファイル

## 2025/10/05~9

### 今日やったこと
- CIはbackと同様→frontのCI実装
  - Launch(setup)
  →言語のsetup
  - lint → コードの構成チェック、バグチェックを目的とする = コードの品質
  - format→ コードの自動整形、一貫性や可読性向上を目的とする = コードの書式
  - typecheck → 型チェック
- 同時デプロイ実行の制御
  - ref = ブランチ名
  - cancel-in-progressは同一で走ったジョブに対し、最新のジョブのみに処理を適応するかどうかを指定する。
  - group: 同時実行単位を指定する。
    下記では、front/に属するブランチを指定
```
  concurrency:
    group: front-${{ github.ref }}
    cancel-in-progress: true
```
- Actions内でのデプロイ実行の流れ
  - Actions内でnode、pnpm、依存関係を入れる。
  - Vercel CLIをinstall
  - vercelからトークンに紐づいたプロジェクト情報をpull
  - プロジェクトの環境情報をCLI環境にセット。
  - 依存関係をビルド、vercelプロジェクトコードをビルド。
  -  CLI専用デプロイコマンドを実行。
```
  vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```
    - --prebuilt →事前にbuildしておいてデプロイを実行する設定
    - --prod → --productionのデプロイ環境に向けてデプロイする

### 今日詰まったところ
- <エラー文> ```ColorMirror_Re/front/App_front/front/App_front”```
  →二重パス問題
  モノレポ時のVercelのルートディレクトリの指定はルートで行う
  .vercel/output/の出力先を[dist]に指定する

## 日付け 2025/ 11/01

### 今日やったこと
- 型.tsファイルを読み、POST通信するファイルで定義した関数に型注釈を入れる

import { type Color } from '../types/Color';

verbatimModuleSyntaxが有効な時、型.tsファイルをインポートするときはtypeをつけないといけない

## 日付け 2025/ 11/02

### 今日やったこと
- .env.development or productionの切り替え
  - viteの仕組みを使って、開発と本番の環境変数を切り替える

- Viteはbuild時の環境によって自動で環境変数を読み込むファイルを切り替えてくれる
  - pnpm run dev → --mode development →.env.development
  - pnpm run build → --mode production →.env.production
- Viteで読み込む環境変数.envファイルの変数には「 VITE_ 」が先頭についていないと読み込まれないので注意が必要
- .envファイルで定義された環境変数を使うときは``` import.meta.env.{環境変数名} ```で使うことができる
-
