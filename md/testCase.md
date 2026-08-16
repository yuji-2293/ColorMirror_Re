# テストケース

## テスト設計

### フロント

### color機能

#### UI

・colorsForm.tsx

- クリックしたボタンの種類によってsetMoodが呼ばれるか？（" "→ワクワク）
- 気分を変更すると、状態をリセットする関数が走るか？（setSelectedColorName('') と resetColors）
- moodが未選択、 isPending == trueの時、生成ボタンが押せない
- 色を生成するためのgenerateMoodData関数のためのparamsを作って渡している

- colorの生成に成功(isSuccess == true) したらトーストの表示がされているか？
- generatedColorの要素数により、1件以上 = 再生成 の切り替わりが起きているか？

- 生成した色が表示、さらに色をクリックしたらsetSelectedColorNameが空文字で呼ばれるか
- isPending = trueの時、<Spinner />が表示されるか

・colorsIndex.tsx

- isLoading == true の時、<div>Loading...</div>が表示される
- isError == trueの時、<div>エラー、ファイル、データの確認をしてください</div>が表示される
- colorsIndexの要素数よって、表示するUIの切り替えが起きている
- handleDelete = (id: number) が呼ばれ、成功したら、トーストの表示が起きている


---

#### api関数

・colorsGetData.ts...Get

- colorsGetData関数が呼ばれると色一覧を取得できる
- API通信が失敗した時、正常にerrorをthrowする

・generateMoodData.ts...Post
[責務]
- 受け取った generateMood をそのまま ApiClient.post に渡している
- 通信失敗時errorをthrowする

---

#### hook
・useColors.ts...TanStack Query

- colorsGetData の結果を data として返せている

useGenerateColor...TanStack Query

- generatedColorの結果を返却できている

### response機能

#### UI

responsesForm.tsx
- AIコメント生成のためのparamsを作成できている
- 作成したparamsをgenerateResponse関数に渡している
- isSuccess = true の時、toast.successが表示される
- isSuccess = false の時、toastが呼ばれない
- isSuccess = true の時、aiResponseが表示される
- isPending = true の時、clickしてもgenerateResponseが呼ばれない
- aiResponseDataの有の時、「AIコメント再生成」が表示できている
- aiResponseDataの無しの時、「AI生成開始」が表示できている
- isPending = true の時<spinner />が表示されている
- !mood || !selectedColorName || isPending の時、AIコメント生成ボタンが非活性になる

createForm.tsx
- 「保存ボタン」をクリックした時、isPending = true ならば、処理が中断される
- サーバーに保存するためのparamsが作成される
- 作成したparamsをcreateResponse関数に渡している
- 保存に成功したら、resetAll,resetAiResponse,resetColors,各関数が走ってフォームがリセットされる
- 保存が成功したら、toast.successが表示される
- isPending = true の時<spinner />が表示されている
- !mood || !selectedColorName || !aiResponse || isPendingの時「保存ボタン」が非活性になる
- 
#### api関数
createResponse.ts
- createResponse関数を呼ぶと、paramsを受け取ってresponseを返す
- 失敗するとthrowを投げる
generateResponse.ts
- generateResponse関数を呼ぶと、paramsを受け取ってresponseを返す
- 失敗するとthrowを投げる
#### hook
useCreateResponse.ts

useGenerateResponse.ts
