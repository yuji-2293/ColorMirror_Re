# React + Vitest + Testing Library テスト学習メモ

## 1. テスト環境の全体像

Reactのフロントテストでは、主に次の役割分担になる。

| ツール | 役割 |
|---|---|
| Vitest | テストの実行、Mock、検証 |
| React Testing Library | Componentの描画、DOM要素の取得 |
| user-event | ユーザー操作の再現 |
| jest-dom | DOM向けMatcherの追加 |
| jsdom | ブラウザのDOM環境をNode上に再現 |

基本構造は以下。

```text
Vitest
├─ describe
├─ it
├─ expect
├─ vi.fn
├─ vi.mock
└─ vi.spyOn

Testing Library
├─ render
└─ screen

user-event
├─ click
└─ type

jest-dom
├─ toBeInTheDocument
└─ toHaveValue

jsdom
└─ 仮想的なDOM環境
```

---

# 2. 基本的なテストの流れ

Componentテストでは、基本的に以下の順序になる。

```text
① render
↓
② screenで要素を取得
↓
③ userEventで操作
↓
④ expectで検証
```

例：

```ts
render(<ColorsForm {...defaultProps} />);

const user = userEvent.setup();

const button = screen.getByRole('button', {
  name: 'ワクワク',
});

await user.click(button);

expect(defaultProps.setMood)
  .toHaveBeenCalledWith('ワクワク');
```

---

# 3. Matcher / Assertion API

## 今日使用したMatcher一覧

| API | 分類 | 用途 | 例 |
|---|---|---|---|
| `toBeInTheDocument()` | DOM Matcher | DOM上に要素が存在する | `expect(button).toBeInTheDocument()` |
| `toHaveBeenCalled()` | Mock Matcher | Mock関数が呼ばれた | `expect(fn).toHaveBeenCalled()` |
| `toHaveBeenCalledWith()` | Mock Matcher | 指定した引数で呼ばれた | `expect(fn).toHaveBeenCalledWith('ワクワク')` |
| `toHaveBeenCalledTimes()` | Mock Matcher | 呼び出し回数を確認 | `expect(fn).toHaveBeenCalledTimes(1)` |
| `not.toHaveBeenCalled()` | Mock Matcher | 一度も呼ばれていない | `expect(fn).not.toHaveBeenCalled()` |
| `toEqual()` | Value Matcher | Object / Arrayの中身を比較 | `expect(result).toEqual(data)` |
| `toThrow()` | Error Matcher | Errorがthrowされたことを確認 | `expect(fn).toThrow()` |
| `rejects.toThrow()` | Promise Matcher | PromiseがrejectしErrorを返す | `await expect(api()).rejects.toThrow()` |

---

## `toBeInTheDocument()`

```ts
expect(
  screen.getByText('気分を入力してcolorを作成')
).toBeInTheDocument();
```

意味：

> 指定したDOM要素が、現在のdocument内に存在していることを確認する。

主にUIの表示確認で使う。

---

## `toHaveBeenCalled()`

```ts
expect(defaultProps.resetColors)
  .toHaveBeenCalled();
```

意味：

> Mock関数が最低1回呼ばれたことを確認する。

引数の内容までは確認しない。

---

## `toHaveBeenCalledWith()`

```ts
expect(defaultProps.setMood)
  .toHaveBeenCalledWith('ワクワク');
```

意味：

> Mock関数が指定した引数を受け取って呼ばれたことを確認する。

重要：

これは、

```text
moodが"ワクワク"になった
```

ことを確認しているわけではない。

確認しているのは、

```text
setMood("ワクワク")
```

という関数呼び出しが発生した事実。

---

## `toHaveBeenCalledTimes()`

```ts
expect(defaultProps.generateColor)
  .toHaveBeenCalledTimes(1);
```

意味：

> Mock関数が指定した回数だけ実行されたことを確認する。

APIの二重送信などを防げていることの確認にも使える。

---

## `not.toHaveBeenCalled()`

```ts
expect(defaultProps.generateColor)
  .not.toHaveBeenCalled();
```

意味：

> Mock関数が一度も実行されていないことを確認する。

例：

```text
mood未選択
↓
生成ボタンdisabled
↓
クリックできない
↓
generateColorは呼ばれない
```

の検証に使う。

---

## `toEqual()`

```ts
expect(result)
  .toEqual(mockResponse.data);
```

意味：

> ObjectやArrayの中身が同じことを確認する。

例：

```ts
const a = { id: 1 };
const b = { id: 1 };
```

なら、

```ts
expect(a).toEqual(b);
```

は成功する。

ObjectやArrayを比較する場合によく使う。

---

## `rejects.toThrow()`

```ts
await expect(colorsGetData())
  .rejects
  .toThrow('API request failed');
```

意味：

```text
Promiseがrejectする
↓
Errorがthrowされる
↓
Error messageが期待値と一致する
```

ことを確認する。

APIの異常系テストで使用する。

---

# 4. Mock API

## `vi.fn()`

```ts
const mockFn = vi.fn();
```

Mock関数を作る。

Mock関数は、

```text
本来の処理をしない
+
呼び出し履歴を記録する
```

関数。

例えば、

```ts
mockFn('ワクワク');
```

すると、

```text
1回呼ばれた
引数："ワクワク"
```

という履歴をVitestが保持する。

そのため、

```ts
expect(mockFn)
  .toHaveBeenCalledWith('ワクワク');
```

で検証できる。

---

## `vi.spyOn()`

```ts
vi.spyOn(ApiClient, 'get');
```

既存の関数を監視する。

例：

```text
ApiClient
├─ get ← 監視
├─ post
└─ delete
```

さらに、

```ts
vi.spyOn(ApiClient, 'get')
  .mockResolvedValueOnce(mockResponse);
```

とすることで、本物のAPI通信をMockへ差し替えられる。

---

## `mockResolvedValueOnce()`

```ts
mockResolvedValueOnce(mockResponse);
```

意味：

> 次の1回だけ、Promiseが成功して指定した値を返したことにする。

イメージ：

```text
ApiClient.get()

本番
↓
Rails API

テスト
↓
mockResponse
```

---

## `mockRejectedValueOnce()`

```ts
mockRejectedValueOnce(
  new Error('API request failed')
);
```

意味：

> 次の1回だけ、Promiseがrejectしたことにする。

つまり、

```ts
Promise.reject(
  new Error('API request failed')
);
```

を再現している。

---

## `vi.mock()`

例：

```ts
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));
```

意味：

> `sonner` モジュールを、本物ではなく指定したMockへ置き換える。

本番：

```text
toast.success()
↓
画面にToast表示
```

テスト：

```text
toast.success()
↓
何も表示しない
↓
呼び出し履歴だけ記録
```

テストしているのはsonner自体ではない。

確認しているのは、

> 自分のComponentが正しい条件で `toast.success()` を呼んでいるか

である。

---

# 5. Testing Library

## `render()`

```ts
render(
  <ColorsForm {...defaultProps} />
);
```

Componentをjsdom上へ描画する。

「仮想ブラウザへUIを構築する」という理解でよい。

ただし、正確には、

> React Componentをjsdom上のDOMへ描画している。

---

## Propsのスプレッド

```tsx
<ColorsForm {...defaultProps} />
```

は、

```ts
const defaultProps = {
  mood: '',
  setMood: vi.fn(),
  ...
};
```

を展開して、

```tsx
<ColorsForm
  mood=""
  setMood={...}
  ...
/>
```

として渡している。

テストごとに必要なPropsを全部書かなくて済む。

さらに、

```tsx
<ColorsForm
  {...defaultProps}
  mood="ワクワク"
/>
```

とすれば、

`defaultProps.mood` だけ `"ワクワク"` に上書きできる。

---

## `screen`

```ts
screen.getByRole(...)
```

`render()` によって生成されたDOMを検索するための入口。

---

## `getByRole()`

```ts
screen.getByRole('button', {
  name: 'ワクワク',
});
```

意味：

> DOMの中から「button」というRoleを持ち、ユーザーから「ワクワク」と認識される要素を取得する。

実際のComponent：

```tsx
<button>
  ワクワク
</button>
```

を取得できる。

Testing Libraryでは、ユーザーが認識できる情報から要素を取得する方法が推奨される。

---

# 6. userEvent

## `userEvent.setup()`

```ts
const user = userEvent.setup();
```

ユーザー操作を行うためのオブジェクトを作る。

この後、

```ts
user.click()
user.type()
```

などが使用できる。

---

## `user.click()`

```ts
await user.click(button);
```

ユーザーが実際にボタンをクリックする操作を再現する。

例えば、

```tsx
<button
  onClick={() =>
    handleMoodSelect('ワクワク')
  }
/>
```

なら、

```text
user.click(button)
↓
onClick
↓
handleMoodSelect("ワクワク")
↓
内部処理
```

まで、本物のComponentコードが実行される。

---

# 7. 本番環境とテスト環境の違い

ここが重要。

## 本番

親Component側で、

```ts
const [mood, setMood] = useState('');
```

があったとする。

ユーザーが押すと、

```text
button click
↓
handleMoodSelect("ワクワク")
↓
setMood("ワクワク")
↓
React state更新
↓
再レンダリング
↓
mood = "ワクワク"
```

となる。

`setMood` は、本物のReact state setter。

---

## ColorsForm単体テスト

テストでは、

```ts
const defaultProps = {
  mood: '',
  setMood: vi.fn(),
};
```

としている。

そのため、

```text
button click
↓
handleMoodSelect("ワクワク")
↓
setMood("ワクワク")
↓
vi.fn()が呼ばれる
↓
呼び出し履歴だけ記録
```

になる。

重要：

```text
mood = ""
```

のまま。

状態は更新されない。

---

# 8. `setMood()`を呼ぶこととstate更新は別

テストで、

```ts
expect(defaultProps.setMood)
  .toHaveBeenCalledWith('ワクワク');
```

が成功しても、

```text
mood === "ワクワク"
```

になったことを意味しない。

検証しているのは、

> ColorsFormが親Componentに対して「moodをワクワクに変更してください」という依頼を正しく出した

ということ。

つまり、

```text
Component単体テスト

ColorsFormの責務
↓
setMoodを正しい値で呼ぶところまで


親Componentの責務
↓
実際にstateを変更して再レンダリングする
```

と境界を分けている。

---

# 9. 本物とMockの境界

今回のColorsFormテストでは、

```text
本物
──────────────
ColorsForm
button
onClick
handleMoodSelect
handleGenerateColor
useEffect

Mock
──────────────
setMood
setSelectedColorName
resetColors
generateColor
toast.success
```

となる。

つまり、

> Component内部のロジックは本当に実行するが、Component外部へ依存する処理をMockで止める。

という考え方。

---

# 10. APIテストの場合

例えば、

```ts
colorsGetData()
```

なら、

```text
本物
──────────────
colorsGetData

Mock
──────────────
ApiClient.get

実行しない
──────────────
Rails API
DB
ネットワーク
```

となる。

テスト対象の責務だけを切り出すため。

---

# 11. 外部ライブラリのテスト

`sonner` の場合、

```ts
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));
```

として、

```text
本物のsonner
↓
使わない

Mockのtoast.success
↓
呼び出し履歴だけ記録
```

にする。

その後、

```tsx
render(
  <ColorsForm
    {...defaultProps}
    isSuccess={true}
  />
);
```

すると、

```text
render
↓
useEffect
↓
isSuccess === true
↓
toast.success("...")
↓
Mockに履歴が残る
```

そして、

```ts
expect(toast.success)
  .toHaveBeenCalledWith(
    '色の生成に成功しました！...'
  );
```

で確認する。

`expect()` がToastを発火させているわけではない。

**発火はrender時。expectはその結果を確認しているだけ。**

---

# 12. 今日理解したテストの考え方

## 内部関数を直接テストしない

例えば、

```ts
handleMoodSelect()
```

が呼ばれたかどうかを直接確認するより、

```text
ユーザーがボタンを押した
↓
setMood("ワクワク")が呼ばれた
↓
resetColors()が呼ばれた
```

という結果を確認する。

理由：

`handleMoodSelect` は内部実装。

将来、

```text
handleMoodSelectを削除
```

しても、ユーザーから見た挙動が同じならテストは壊れない方が良い。

---

# 13. Component / Hook / APIごとのテスト対象

| 層 | 主にテストするもの |
|---|---|
| Component | ユーザー操作・表示・条件分岐 |
| Hook | Hook独自のデータ整形・公開方法 |
| API関数 | endpoint・request・response・error |
| 外部ライブラリ | 自分のコードから正しく呼び出しているか |

例えば、

```text
ColorsForm
↓
generateColor({ mood })が呼ばれる

useGenerateColor
↓
generatedColorを正しく公開する

generateMoodData
↓
POST /colors/generateへ正しいparamsを送る

Rails
↓
実際に色を生成する
```

それぞれ別の責務。

---

# 14. 今日の重要ポイント

テストでは、

```text
「コードを全部動かして正しいか」
```

ではなく、

```text
「この単位の責務はどこまでか」
```

を決める。

そして、

```text
テスト対象
↓
本物を動かす

外部依存
↓
Mockにする

ユーザー操作
↓
userEvent

結果
↓
expect + Matcher
```

という構造で考える。

この責務の境界を理解することが、VitestやTesting LibraryのAPIを覚えること以上に重要。
