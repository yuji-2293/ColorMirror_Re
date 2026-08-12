Vitest
│
├── Mock API ...テスト対象周りを偽者にするAPI
│   ├── vi.fn()
│   ├── vi.spyOn()
│   ├── mockResolvedValue()
│   └── mockRejectedValueOnce()
│
└── Assertion API ... 結果を検証するためのAPI
    ├── expect()
    └── Matcher
        ├── toBe()
        ├── toEqual()
        ├── toThrow()
        ├── toHaveBeenCalled()
        ├── toHaveBeenCalledWith()
        └── rejects

| API | 分類 | 役割 |
|------|------|------|
| `vi.spyOn()` | **Mock API** | 関数を監視・Mockする |
| `mockResolvedValue()` | **Mock API** | Promise成功時の戻り値を設定する |
| `mockRejectedValueOnce()` | **Mock API** | Promise失敗時の戻り値を1回だけ設定する |
| `expect()` | **Assertion API** | 検証を開始する |
| `rejects` | **Promise Matcher** | Promiseがrejectされることを期待する |
| `toThrow()` | **Matcher** | Errorが投げられたことを検証する


## 頻出     
### Vitest  
vi.fn  
vi.spyOn    
vi.mock     
mockResolvedValue   
mockRejectedValueOnce   

### Matcher     
toBe    
toEqual     
toThrow     
toHaveBeenCalled    
toHaveBeenCalledWith    
toHaveBeenCalledTimes   

### Testing Library     
render      
screen.getByRole    
findByRole  
waitFor     
userEvent.click     
userEvent.type  


### 自分で実装したテストのよくある流れ
 ```
 it('クリックするとsetMoodが呼ばれる', async () => {
    render(<ColorsForm {...defaultProps} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'ワクワク' });
    await user.click(button);
    expect(defaultProps.setMood).toHaveBeenCalledWith('ワクワク');
  });

1.renderで仮想上コンポーネントを構築
{...defaultProps} これは？事前に定義したprops集をスプレッド構文で展開してる？
2.userという名前で  userEvent.setup(); →イベントを実行関数を定義
3.    const button = screen.getByRole('button', { name: 'ワクワク' });
→screenは、コンポーネント上の実際の要素を取得

```実際のコード
          <button
            onClick={() => handleMoodSelect('ワクワク')}
            className="flex items-center justify-center rounded-xl bg-amber-300 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer border-2 border-white focus:border-gray-300 focus:border-4 active:shadow-2xl focus:scale-120 focus-rounded-2xl transition-transform hover:bg-accent"
          >
            ワクワク
          </button>
```

4.    await user.click(button);
→定義したイベント実行関数に取得したbutton要素を実行してもらう
5. expect(defaultProps.setMood).toHaveBeenCalledWith('ワクワク');
→？？何が起こってる？
setMoodを呼ぶと、'ワクワク'が出てきた
= setMoodの状態が更新される関数を実行したから

```

- vi.fn() はMock関数を作る
- mockReturnValue() はその戻り値を決める
- useColors() の代わりにMock関数が呼ばれる
- vitestの性質上、vi.mockがファイル内で一番先に実行される

```

① const mockColors = vi.fn();

② vi.mock(...)

②が先に呼ばれてしまう


```
vi.mock() は「モジュール」をMockする    

vi.mock('@/app/features/colors/hooks/useColors', ...)   

ColorsIndex.tsx内で
useColorsから {isLoading...}を呼んでる

これをテストでは
useColorsを呼ぶときにtrueにすることで、Loading...が表示されるかをテストしたい

useColorsをmockにする
useColorsを呼んだら、mockした関数 = mockColorsが呼ばれて、その戻り値がisLoading=trueであると、このテストは成立する

この時、useColors→mockColorsがよぶ処理がvitestの都合上、mockColors自体を定義するよりも先に実行されてしまう。
だから、hoisted()を使って先に定義する

const { mockColors } = vi.hoisted(() => ({
  mockColors: vi.fn(),
}));

```
