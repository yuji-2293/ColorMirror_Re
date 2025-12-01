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
