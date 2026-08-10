# テストケース

## テスト設計

### フロント

### color機能

#### UI

・colorsForm.tsx

- isPending = trueの時、<Spinner />が表示されるか
- クリックしたボタンの種類によってsetMoodが呼ばれるか？（" "→ワクワク）
- 気分を変更すると、状態をリセットする関数が走るか？（setSelectedColorName('') と resetColors）
- moodを選択している状態で生成ボタンを押すと、generateColor({ color })が走る
- moodが未選択、 isPending == trueの時、生成ボタンが押せない
- generatedColorの要素数により、1件以上 = 再生成 の切り替わりが起きているか？
- colorの生成に成功(isSuccess == true) したらトーストの表示がされているか？
- 生成した色が表示、さらに色をクリックしたらsetSelectedColorNameが呼ばれる
- 色を生成するためのgenerateMoodData関数のためのpramsを作って渡している

・colorsIndex.tsx

- isLoading == true の時、<div>Loading...</div>が表示される
- isError == trueの時、<div>エラー、ファイル、データの確認をしてください</div>が表示される
- colorsIndexの要素数よって、表示するUIの切り替えが起きている
- colorsIndexの中で、AIのコメントの生成の可否によってUIが切り替えられている
- 履歴削除ボタンが押されたら、該当のdataが削除されている
- 

---

#### api関数

・colorsGetData.ts...Get

- colorsGetData関数が呼ばれると色一覧を取得できる
- API通信が失敗した時、正常にerrorをthrowする

・generateMoodData.ts...Post

- 受け取った generateMood をそのまま ApiClient.post に渡している
- responseを返す
- 通信失敗時errorをthrowする

---

#### hook
・useColors.ts...TanStack Query

- 初期状態では data が [] である
- colorsGetData の結果を data として返せている

useGenerateColor...TanStack Query
- generatedColorの結果を返却できている
