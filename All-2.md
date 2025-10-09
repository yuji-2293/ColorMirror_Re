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

- CIはbackと同様
