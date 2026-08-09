import { render } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// describe = テストグループの定義,Buttonコンポーネントのテストをまとめる
describe('Button', () => {
  // it = テストケースの定義,個々のテスト内容を記述する
  it('ボタンが表示される', () => {
    // render = コンポーネントを仮想DOMに描画する
    render(<Button>保存</Button>);
    // screen.getByRole = role属性('button')を持つ要素を取得する,ここではbutton要素を取得する
    // expect = 期待値の定義、screen...で取得した要素が存在することを確認する
    // toBeInTheDocument = 要素がDOMに存在するかどうかを判定するマッチャー
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
