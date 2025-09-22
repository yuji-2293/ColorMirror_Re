# 学習記録用ファイル

## 2025/9/22

### GitHubActions について

github/workflows/\*\*.yml のような構成でファイルを作成し、ファイルの中に処理を記述する
**[大前提]**
github/workflows ディレクトリは必ずルートディレクトリ(=app といったトップ階層)に置くこと
→ ルートにないと、GitHub が yml ファイルを認識しない！！
モノレポ構成の時、front や back といったサブディレクトリに配置しないこと！！

**on:**
→push や pull\*request といったユーザー側のアクションを検知してトリガーとなる事項を設定する
**paths:**
→ パスに基づいた差分を検知して、workflow を実行する
モノレポなどでは、back/front のディレクトリが存在し、どちらディレクトリの差分か認識する必要があり、CI 処理を仕分けるために必要となる。
app/back → バックエンド側のコードの差分を検知して back.yml などの CI 設定を行なったファイルを自動で実行する
app/front → バックエンド側のコードの差分を検知して back.yml などの CI 設定を行なったファイルを自動で実行する

[例コード]
{
on:
workflow_dispatch: → **これを記述しておくことで、GitHub サイトで手動でワークフローを起動するボタンを出現、実行できる**
pull_request: → プルリクエストを行った時実行
branches: ["main"] →main ブランチのみ実行を指定
paths: - "back/**" - ".github/workflows/back.yml"
push: →push を行ったとき実行
branches: ["main"] →main ブランチのみ実行を指定
paths: - "back/**" - ".github/workflows/back.yml"
}
