import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { describe, it, expect, vi } from 'vitest';
import useEvent from '@testing-library/user-event';

// describe = テストグループの定義,Buttonコンポーネントのテストをまとめる
describe('Button', () => {
  // it = テストケースの定義,個々のテスト内容を記述する
  it('ボタンが表示される', () => {
    // render = コンポーネントを仮想DOMに描画する
    render(<Button>保存</Button>);
    // screen.getByRole = role属性('button')を持つ要素を取得する,ここではbutton要素を取得する
    // expect = 期待値の定義、screen...で取得した要素が存在することを確認する
    // toBeInTheDocument = 要素がDOMに存在するかどうかを判定するマッチャー
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
  });
});

it('クリックするとonClickが呼ばれる', async () => {
  // vitestのvi.fn()を使ってモック関数を作成することで、クリックイベントが発火したかどうかを確認できる
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>保存</Button>);
  // useEvent.setup()を使ってユーザーイベントをセットアップすることで、クリックイベントをシミュレートできる
  const user = useEvent.setup();
  await user.click(screen.getByRole('button', { name: '保存' }));
  // handleClickが呼ばれたかどうかを確認するために、toHaveBeenCalledTimesを使ってモック関数が1回呼ばれたことを確認する
  // toHaveBeenCalledTimes = モック関数が何回呼ばれたかを確認するマッチャー(1回呼ばれたことを確認する)
  expect(handleClick).toHaveBeenCalledTimes(1); // モック関数が1回呼ばれたことを確認する
});
