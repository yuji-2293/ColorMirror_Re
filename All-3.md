# 学習記録用ファイル

## 日付け 2025/ 11/21

### 今日やったこと
- Topページ用の画像を元のアプリから転用して表示
- body全体のスタイリングをTailwindCSSで設定
### 詰まったこと（エラー、調査したこと、考えたこと。調査→仮説→検証
  - <現象>TopImage画像をおいても表示されない→横幅が0になってしまう
  - <所感>何が起きてるのかわからない、TailwindCSSを記述しても反映されないのでは？
  - <対応>index.css App.cssのデフォルトCSSが効いているせい
  →index.cssのrootやbodyに効いている不要な記述を削除。
  →viteプロジェクト作成時にデフォルトで生成されてしまうので実装時に削除しておく。

## 日付け 2025/ 11/24

### 今日やったこと
- prettierの設定解説
  - prettierrc.jsonの中身
{
  "semi": true,
  ``` セミコロンをつける ```
  "singleQuote": true,
  ``` シングルクォートつける ```
  "trailingComma": "es5",
  ``` 配列・オブジェクトの末尾にカンマを付けます（ES5互換）。地味にGitの差分減らすやつ。 ```
  "printWidth": 100,
  ``` 1行の最大文字数 ```
  "tabWidth": 2
  ```　インデント幅を2スペースつける ```
  "bracketSpacing": true
  ```  {}の中にスペースを入れる ```
}

## 日付け 2025/ 12/01

### 今日やったこと
- API用のTSファイルを作成 + axiosの導入
  - header情報やエラーハンドリングを毎回書くのでなく、TypeScriptファイルで生クライアント = axiosインスタンスを作成しておくことで処理を共通化する
  - axiosはサーバーから受けたresponse情報を自動でJSONパース処理をしてくれる便利なライブラリ
  - 以下実際のファイルの処理内容

```  
# pnpmでinstallしたライブラリを読み込む
import axios from 'axios';
# 環境変数ファイルで定義した変数を呼び出して格納
const baseURL = import.meta.env.VITE_API_BASE_URL || '';
# リクエストヘッダーをjsonで送ることを明示した文字列を変数に格納
const headers = {
  'Content-Type': 'application/json',
};
# 省略記法 axios.create({ baseURL: baseURL, headers: headers })と一緒。
# create関数でbaseURLとheadersをaxiosインタンスに設定してクライアントを生成する。
export const ApiClient = axios.create({ baseURL, headers }); 

# リクエストやレスポンスが then/catch で処理される前に処理を割り込ませる。
ApiClient.interceptors.response.use(
  # responseで受けた内容は自動でJSONパースされてるからそのままretrunできる !!
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    # errorで受けた内容をステータスコードによって処理内容を変更する。
    switch (error.response?.status) {
      case 401:
        break;
      case 404:
        break;
      default:
        console.log('== internal server error ==');
    }
    const errorMessage = (error.response?.data?.message || '').split(',');
    throw new Error(errorMessage);
  }
);
```

- 作成したクライアントファイルを使用してaxiosでget通信のテスト
  - 前のコード
  ```
  import { API_BASE_URL } from './config';

  export default async function colorsGetData() {
    const response = await fetch(${API_BASE_URL}/colors);
    if (!response.ok) {
      throw new Error('Failed to fetch colors data');
    }

    const log = await response.json();
    console.log(log);
    return log;
  }
  ```

  - クライアントファイルを作成した後のコード
  ```
  import { ApiClient } from '@/app/lib/apiClient';

  export default function colorsGetData() {
    return ApiClient.get('/colors');
  }
  ```
  > fetchでやっていたasync/awaitでPromiseを待つ処理も、axiosインスタンスの内部処理内で行うことで記述を減らし、Promiseを返すことができている。

## 日付け 2025/ 12/06

### 今日やったこと
- TanStackQueryの導入
  - install
  - main.tsxにてAppコンポーネントをQueryClientProviderでラップ
  ```
  import App from '@/App.tsx';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
      const queryClient = new QueryClient();  
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  # QueryClient =  キャッシュの管理者（データセンターのようなもの）
  # QueryClientProvider = App内でuseQuery/useMutationを呼んだらQueryClientに接続して問い合わせする。
    下記のuseColorsでカスタムフック内でuseQueryを使用してる。
  # useQuery / useMutation = “そのデータセンターに接続する端末”
  ```

  - カスタムフック ```useColors.ts```ファイルを作成
   ```
   > hooks/useColors.ts

      import { useQuery } from '@tanstack/react-query';
      import colorsGetData from '@/app/features/colors/api/colorsGetData';

      export function useColors() {
        const query = useQuery({
          queryKey: ['colors'],
          queryFn: colorsGetData,
        });

        # queryという変数にラベル('useColors')とcolorsGetData関数をReactQuery(useQuery)に渡している。
        # 受け取ったReactQuery(useQuery)は
        ReactQuery はここで内部的に：
        •	data
        •	isLoading
        •	isError
        •	error
        •	refetch
        といったオブジェクトqueryに持たせて返す。
        下記の...queryでreturnしているのがそう。


        const handleRefetchColors = () => {
          query.refetch();
        };
        return {
          ...query,
          refetchColors: handleRefetchColors,
        };
      }

  # 
   > App.tsx

      function App() {
      const { data, isLoading, isError, refetchColors } = useColors();
      if (isLoading) {
        return <div>Loading...</div>;
      }
      if (isError) {
        return <div>Error occurred while fetching colors data.</div>;
      }
      if (data) {
        console.log('TanStackQueryで取得したdata:', data);
      }
      return (
                <button type="button" onClick{refetchColors}>
                  ボタン
                </button>
                ：
                ：
                ：
            )
   ```
  - ## ReactにおいてHooksはトップレベルに置いてはいけないルールがある
    - OKな場所
      - 関数コンポーネントの中
      - カスタムフックの中
    - NGとなる場所
      - トップレベル(定義した関数の外側)
      - トップレベルで定義した関数の中

## 日付け 2025/ 12/08

### 今日やったこと
- useMutationを使ったPOST用のHooksの作成と、以前作成したapiClientを使用したPost関数を作成する
- useQueryもuseMutationもカスタムフック化することでポテンシャルが発揮される
- mutationとmutateとは？
- useMutationのcallback関数の使用方法


### 詰まったこと
- カスタムフック関数を呼び出す時、イベントハンドラに直接{}で呼び出すことはできない
  - 起きたエラー
  ``` <button type="button" onClick={mutate}>  #これはダメ ✖︎ ```
    - 関数の役割と型が異なる
    - 実行しようとしてるのは
      - 引数: variables(型:void)
      - 戻り値: void
    - onClick={event}のマウスイベントにおいてeventを引数とするのにvoidを入れようとするとエラーが起きる。
    - エラー文
    → ``` 型 ‘UseMutateFunction<Color, Error, void, unknown>’ を型 ‘MouseEventHandler’ に割り当てることはできません。```
  - 対応したこと
  ``` 
    <button type="button" onClick={() => mutate()}  
        // イベントは受け取らず、自分で呼び出す
        送信テスト
    </button>
  ```
  - 上の形で``` () => mutate()  ```とすることでReactはイベントを無視してボタンをトリガーとして関数を実行してくれる。
