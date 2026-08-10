import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ColorsForm } from '@/app/features/colors/components/colorsForm';
import { type ColorsFormProps } from '@/app/features/colors/types/Color';

// ColorsFormが必須とするpropsを全て満たすモック（関数はvi.fn()でモック化）
// vi.fn()はVitestのモック関数を作成するための関数で、テスト中に呼び出されたかどうかを確認することができる
// このテスト全体で扱える「普通の状態」を表すデフォルトのpropsを定義することで、テストケースごとに個別にpropsを設定する必要がなくなる
const defaultProps: ColorsFormProps = {
  mood: '',
  selectedColorName: '',
  setMood: vi.fn(),
  setSelectedColorName: vi.fn(),
  generateColor: vi.fn(),
  generatedColor: [],
  resetColors: vi.fn(),
  isPending: false,
  isSuccess: false,
};

describe('ColorsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('フォームが表示されるか', () => {
    render(<ColorsForm {...defaultProps} />);
    expect(screen.getByText('気分を入力してcolorを作成')).toBeInTheDocument();
  });
});
