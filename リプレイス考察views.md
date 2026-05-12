## ColorMirrorのコードを見て構成や設計に関する気づき
  - 画面遷移
    - 同期的
    - 機能のデフォルトがform画面
    - 
  - views
    - views/sharedファイルにpartial用共通ファイルを置いている
      - footer
      - header
      - form
      - 責務がごちゃ混ぜになってる
      - shared内で関連性なくまとめられてる
      - heatmap(外部ライブラリ)
      - oauth(google認証ボタン)
      - 各controller関連の共通ファイルが点在
        - UI
        - 認証
        - 機能ライブラリ
        - 認証前UI

     - これらは全て責務が異なる領域のものが同じ階層に存在している
     - shared配下のファイル = 共通化ファイル　の意識でrenderで呼び出すファイルを逃す場所として認識している。
     - 機能単位で分けられておらず、shared配下内で責務がバラついてファイルが配置されてしまっている
     - 呼び出しファイルの保管庫化してる
     - 可読性が悪い
    ```
      viewsにおいてRailsのファイル構成から読み取れること
      ColorMirrorのviewsは、model,controllerの関連ディレクトリ単位で配置されている
        > おそらくRailsの規約によるもの
      アプリの構成的に、sharedから必要な機能ファイルを呼び出して構成している
      REST設計に基づいたファイル構成でなく、form画面をアプリの機能の根幹においているためである  

      [アプリの処理フロー]
      formの送信->色の生成→データの登録->コメントの生成 => 一覧、振り返り  

      フローに基づくと、アプリの機能が直線的であり、model単位でformの進行に関連している
      フォーム起点の体験フローになっている
      ->よって、sharedから必要なファイルを呼び出して使う頻度が高くなっている
        ->これがReact化できる利点になる
    ```

    ```
          viewsにおいて React化した利点
          Reactのディレクトリ設計では、features（機能単位）ベースでディレクトリの分割を行った
          app
            - feature(1単位)
              - colors
                - hooks
                - component(UI)
                - api
                - types(TypeScriptの型定義)
          この構成で、1機能ごとにUI、API通信、型定義、hooksを同じディレクトリにまとめることで
          以下の4つの利点を得ることができる
          - 関連ファイルを探しやすくなる
          - 責務の分割がしやすくなる
          - 機能単位で修正（保守）しやすくなる
          - さらに、機能単位で拡張することも容易になる

          headerや、footerなどアプリの全体に関わるUIは
          srcの直下に置くことで共通化することができている
          src
            - hooks
            - component
            - api
            - types

    ```

  - 認証
    - 認証は完全devise任せ
    - controllerもdeviseが生成したため、カスタムはできても内部の動きまでは把握できてない
    - 
  - JavaScript
    - 非同期処理
      - turbo(turbo-stream)
    - UIに関わる部分
    - DOM操作
    - fetch通信
  - 
