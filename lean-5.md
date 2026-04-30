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

## 日付け 2025/ 3/7

### 今日やったこと
  - colorsIndexの作成でTanStackQueryが取得したデータを一覧表示できた
  - colorsCreateの作成でTanStackQueryでデータの作成と一覧の更新(invalidateQueriesで自動再取得)ができた
    - TanStackQuery(ReactQuery)
      - 責務
        - useQuery → 取得
        - useMutation → 作成/削除
        - queryClient → キャッシュ管理
  - 実装のために学んだこと
    - API関数、Hook,UIの責務と分離を学んだ
    - AxiosResponseは整形してからUI（コンポーネント）側に渡す
      - AxiosResponse → dataを取り出してreturnすることで、UI側は,data.colorNameの形で取り出すことができる
      - 
### 今日学んだ一番大事なこと
> useMutation<TData, TError, TVariables>
> → useMutation<Color, Error, CreateColorParams>

> 実際のコード
  ```
  // カスタムフック関数（mutation関数）
  export function useCreateColors() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Color, Error, CreateColorParams>({
    mutationFn: (newColor) => colorsPostData(newColor),

    // ここのdataが上で定義してるColor（型）になる
    onSuccess: (data) => {
      console.log('Color 作成成功結果:', data);
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
  });
  return {
    ...mutation,
    createColor: mutation.mutate,
  };
}

  // API関数
  export default function colorsPostData(newColor: CreateColorParams): Promise<Color> {
    return ApiClient.post('/colors', newColor);
  }


  // UI
  export const ColorsCreate = () => {
  const createColors = useCreateColors();

  const [colorName, setColorName] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでカラーの新規作成の処理を実装します。
    console.log('カラーの名前:', colorName);
    console.log('ムード:', mood);
    const newColor: CreateColorParams = {
      color: {
        colorName: colorName,
        mood: mood,
      },
    };
    console.log('新しいカラーのデータ:', newColor);
    createColors.mutate(newColor);
  };
  .
  .
  .


  ```
  - 上記は、TanStackQueryを型を理解したうえで使用した設計
  ```
  > useMutation<TData, TError, TVariables>
  TData : 通信が成功した時に返ってくるデータの型
  TError: 通信が失敗した時のエラー型
  TVariables: mutateに渡す引数の型  <~ (今回一番重要な要素)
  ```
  
  TVariables: mutateに渡す引数の型  
  →     createColors.mutate(newColor);
  引数 = newColor(=params)のようなオブジェクト構図を渡す
  color: {
    colorName
    mood
  };  
  のような形でmutate(関数)に渡すことで、APIを通してサーバーにparamsを渡すことができる

## 日付け 2025/ 3/12

### exportの仕方についてまとめ
  - *export default function*
    - そのファイルのメイン機能につける
    - importするときの名前を自由につけられる
      - ファイルの役割が明確
        - Home.tsx
        - UserPage.tsx
    ```
    import Home from './Home'
      Home.tsxのHomeに付ける
       export default function Home()  {}
    import Page from './Home'
    ```
  - *export function*
    - 名前付きexport
    - 名前を固定する
    - importするときに {}をつけて呼び出す
    - API関数 hooks helperなど
    - 1ファイルに複数存在する可能性がある関数についてつける
    ```
    import { getUser } from './api'
      export function getUser() {}
    ```
  - *export const*
    - arrow functionをつけて定義する
    - 名前付きexport
    - hooks storeなど
    ```
    import Page from './Home'
      export const useStore = () => {}
    ```
  - × export default cont
    - これは存在しないし、使えない（文法ミス）
    - どうしてもconstをdefault exportしたいなら
    ```
    const Home = () => {}
    export default Home
    ```
## 日付け 2026/ 4/16

### MVP機能完成した後のフロー
  - ColorMirror_Re
    - ~~履歴ページの作成~~
    - 最低限、MVPアプリを見せられるUIまで昇華
    - GitHubページ用の作成
      - README
      - インフラ構成図
  - ColorMirrorの再起動
    - renderの再構築
      - 必要インスタンスの用意
      - コストの削減を検討
  - ポートフォリオ見せる用の静的ページの作成（必要なら）
- 転活の再開
  - 求人選定

## 日付 2026/ 4/28
### React(TanStack) Query のmutation.resetについて
 
 - mutationのオプション[reset]を使う
  ```
  import { useMutation } from '@tanstack/react-query';
import { type GenerateMoodParams } from '@/app/features/colors/types/Color';
import generateMoodData from '@/app/features/colors/api/generateMoodData';
import { type GenerateResponse } from '@/app/features/colors/types/Color';

export function useGenerateColor() {
  // ※省略
    resetColors: mutation.reset,
  };
}
```
- React的な画面の変え方
  - UIを直接消すんじゃなくて、UIの根拠になっている state / data を消す。
    - RailsはHTMLをサーバー側で組み立ててブラウザに返す
      - これによって、一度描画したデータはサーバー側の更新→ページの遷移や画面の更新がされないと変更されない
  - 対してReactはブラウザにて{ state/props/querydata}によって画面を描画している
    - よって、ブラウザ自体が持つdataの有無によってUIが描画されるため、{mutation.reset} によってdataの値を消すことで、ブラウザでは画面からdataが消えたように見せることができる

```
  const queryClient = useQueryClient();
  const mutation = useMutation<CreateResponse, Error, CreateResponseDataParams>({
    mutationFn: (params) => createResponse(params),
    onSuccess: () => {
      // 成功した場合の処理（例: キャッシュの更新や通知の表示など）
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
  });
```
