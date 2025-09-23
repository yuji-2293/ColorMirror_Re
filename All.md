# 学習記録用ファイル

## 2025/9/22

### 今日やったこと

- GitHubActions について
  - **github/workflows/〇〇.yml の名前でファイルを作成し、ファイルの中に処理を記述する**
  - github/workflows ディレクトリは必ずルートディレクトリ(=app といったトップ階層)に置くこと
  - ルートにないと、GitHub が yml ファイルを認識しない！！
  - モノレポ構成の時、front や back といったサブディレクトリに配置しないこと！！

- GitHubActionで扱うキーワード
   1. **on:**
      →push や pull\*request といったユーザー側のアクションを検知してトリガーとなる事項を設定する
   2. **paths:**
      → パスに基づいた差分を検知して、workflow を実行する
      モノレポなどでは、back/front のディレクトリが存在し、どちらディレクトリの差分か認識する必要があり、CI 処理を仕分けるために必要となる。
      app/back → バックエンド側のコードの差分を検知して back.yml などの CI 設定を行なったファイルを自動で実行する
      app/front → フロントエンド側のコードの差分を検知して back.yml などの CI 設定を行なったファイルを自動で実行する

      [例コード]
      ```
      on:
         workflow_dispatch: → **これを記述しておくことで、GitHub サイトで手動でワークフローを起動するボタンを出現、実行できる**
         pull_request: → プルリクエストを行った時実行
            branches: ["main"] →main ブランチのみ実行を指定
      paths: - "back/**" - ".github/workflows/back.yml"
      push: →push を行ったとき実行
         branches: ["main"] →main ブランチのみ実行を指定
      ```

- uses: で指定される公式Actionについて
   - ```ruby/setup-ruby@v1``` → これは、Ruby が公式に用意している GitHubAction
   - Action 内でランナーに対して Ruby をインストールして pathを通す役割を持つ。
   [例コード]
   ```
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
      // with オプションで公式 action に必要な引数を指定して渡せる、今回はモノレポ構成なので、working-directory にてファイル位置を指定して渡してあげている
      with:
      // 下記のようにしてファイル位置を指定
      working-directory: back/App_back
      // ruby の version を公式 action に渡してあげる
      ruby-version: .ruby-version
      bundler-cache: true
   ```
   各々の言語によって actions/setup-〇〇 といった公式の推奨アクションが用意されている（ない場合もある）ため、必要に応じて GitHubActions タブから引用してくるか、自前で記述する必要がある。
   > まとめ: 「言語ごとに用意されている公式アクションを確認 → 使うときは with: で設定を渡す」

- work フローの記述順序

1. 「runs-on:」 GitHub 上で実行する仮想環境の指定
2. 「steps:」 実行するタスクを順序立てて定義する
3. 「name:」 steps の配下で実行するタスク名を設定
4. 「uses:」 actions/checkout@v4 初めに必ず、リポジトリ内のコードをクローンして仮想環境内にコピーする
   以降 uses:で言語の setup などを行う
5. 「with:」action に合わせた引数を指定して uses:で指定した action に渡す
6. 「run:」 shell を立ち上げてコマンドを実行する。bin/rails や /usr/bin/bash によって立ち上がる。brakeman や rubocop の実行、依存関係の install などを行う
   **※ いずれも、最初に actions/checkout@v4 の action を uses: で指定して、コードを仮想環境に落としておかないと、空白の環境では何も実行できないため、no such file directory とエラーを吐かれるので注意！！**

実行 steps の本質は、
• どのディレクトリでコマンドを実行するか（working-directory で実行ファイルの位置を指定する）
• いつそのディレクトリが存在するか（checkout(action でコードをクローンする) のタイミング）
以上のようになる。

--
• 公式セットアップ系：Ruby は ruby/setup-ruby@v1 一択。他言語も “setup-◯◯” の公式/準公式をまず探す。
• with は「アクションに渡す引数」。Action ごとに受付キーが違う（README/action.yml 参照）。
• 順序の肝：checkout →（必要なら言語セットアップ）→ OS パッケージ → Lint/Build/Test。
• 場所の肝：
• どこで実行するか＝ defaults.run.working-directory（run:専用）
• uses: の作業場所はアクションの with: で指定（あれば）。
• 発火の肝：paths で front/back を分岐、workflow_dispatch で手動デバッグ口を確保。
--

### 今日詰まったところ

・.ruby-version が GitHub 側で見つけられなかった
・test: において、/usr/bin/bash の立ち上げで、コードをクローンする処理と、run:でシェルを立ち上げる処理の順序が違ってた
→ 何よりも先に[actions/checkout@v4]を user: で実行して、仮想環境にコードを落とす。落とすことで shell の実行ファイルが配置され、shell が立ち上がる
・defaults.run.working-directory の有効範囲は run:のみ
