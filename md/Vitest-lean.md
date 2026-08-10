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
