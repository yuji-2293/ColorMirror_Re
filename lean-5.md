## 日付け 2025/ 2/14

### 今日やったこと
  - toast表示と状態による切り替え
    - shadcn/ui Sonner を使用
    - App.tsx(トップレベルにて) ```import { Toaster } from '@/components/ui/sonner';```を読み込む
    - 必要とするcomponentにて``` import { toast } from 'sonner'; ```でtoastが使用可能になる


### 詰まったこと（エラー、調査したこと、考えたこと。調査→仮説→検証
  - <現象> Private Publicそれぞれにてtoastにてアクションに合致したtoastの表示を行いたい
    - ログイン・ログアウトの挙動と、ProtectedRouteのガード節による強制リダイレクトとでtoastが重複している
  - <所感>
    - toastの出し分けは状態の変化のみで実現できると思っていた。
    - ユーザーの挙動において、 UXでは通常の遷移とは別にセキュリティ（ガード）による遷移も含まれる
      - これだと状態の変化だけでは実現できない→ページの遷移の責務を担うのがガードの部分に担わせているため
       ```
       // ログイン後の遷移
          if (authStatus === 'authenticated') {
            // 認証されている場合、ホームページにリダイレクト
            return <Navigate to="/" replace />;
          }
      // ログアウト遷移
      // →下記のような遷移方法だと、状態の切り替えだけでは重複する
            if (authStatus === 'unauthenticated') {
            // 認証されていない場合、サインインページにリダイレクト
            return <Navigate to="/signIn" replace />;
          }
      ```
  - <対応>
    - ログアウトにおけるユーザーの状態の変化に「理由」を付け加える
      - userの状態  unauthenticated に変化した理由をもとにtoastの表示を出し分けることにした
      - zustandによるカスタムフック useAuthStoreにて、logout処理を行う関数に理由(= reason)を追加
      - redirectedReason: reason  (+set...) を追加して```'login_require' | 'logged_out' | null;```をstoreが受け取れるようにする
      - clearRedirectedReason: を追加して、処理の中で認証におけるstateをnullにできるようにする
      ```
      // ログアウトした状態(useAuthStatus = unauthenticated)の時のページ遷移で分岐させる
      // useAuthStoreにてredirectedReasonの状態を引数で受け取れるようにする
        const redirectReason = useAuthStore((state) => state.redirectedReason);
        if (authStatus === 'unauthenticated') {
          // リダイレクト理由に応じたトースト表示のための変数
          // 変数redirectReasonに値があればそのまま格納、なければ'login_required'を格納
          // ->この時の値があるときとは、logout('logged_out'); によって通常のログアウト挙動によりlogged_outを受け取っていれば変数toastにはlogged_outが入り、そうでなければ、login_requireが入る 
          const toast = redirectReason ?? 'login_required';
          // 認証されていない場合、サインインページにリダイレクト
          return <Navigate to="/signIn" replace state={{ toast, from: location.pathname }} />;
        }

            // 上記のように変数toastに入った値によって、toast.successとtoast.errorを出し分けることができる
            if (state.toast === 'login_require') toast.error('ログインが必要です。');
            if (state.toast === 'logged_out') toast.success('ログアウトしました。');
      ```
      - 

## 日付け 2025/ 2/18

### これからやること
- サイドバーのディティールを詰める
- 開閉ボタンが動かないように変更
  - 開と閉のボタンを分ける？
- 機能開発に着手
  - 色選択formの作成
    - 単語を選択する→外部APIに通信→色の生成→色の保存ができるようになる
  - サーバーに保存
  - userに依存したフロント→サーバーへの通信経路を確定
  - userが保存した色をフロントに表示、削除できるようにする
  - 色保存formに外部API(Open AI)への通信経路を追加
    - 外部APIからの生成されたresponseをサーバーに保存
    - 保存したresponseをフロントに表示
- 単語→色の生成→色の保存→選んだ色に対応した診断をAIが生成→AIのコメントを保存
  - 上の条件ができるまでをMVPとする
  - 本番環境で動くこと
- 転職活動準備を始める
  - MVPが完成して、 Vercel,Renderそれぞれで稼働している。
  - RUNTEQが開発した既存ポートフォリオアプリが稼働できるようにRender内でのインスタンを用意、DBも準備して稼働開始
    - 可能なら使用するメモリ等を再検討しておく
    - 企業の担当者が触れるように稼働をきちんと確認しておく
  - リプレイスアプリ + 既存アプリが魅せられるような静的サイトを用意する？
