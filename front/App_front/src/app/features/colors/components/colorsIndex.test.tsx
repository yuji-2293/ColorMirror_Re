import { render, screen } from '@testing-library/react';
import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
// vi.hoisted()を使うことで、vi.mockよりも先にmockColorsを定義することができる。
// vitestの性質上、vi.mockだけだと、テストファイル内でmockColorsを参照する前に、useColorsが呼ばれてしまうため、mockColorsを先に定義する必要がある。
// これにより、useColorsフックのモックを作成し、テスト内で使用することができる。
const { mockColors } = vi.hoisted(() => ({
  mockColors: vi.fn(),
}));

vi.mock('@/app/features/colors/hooks/useColors', () => ({
  useColors: mockColors,
}));

const { mockDeleteColor } = vi.hoisted(() => ({
  mockDeleteColor: vi.fn(),
}));

vi.mock('@/app/features/colors/hooks/useDeleteColor', () => ({
  useDeleteColor: () => ({
    deleteColor: mockDeleteColor,
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('ColorsIndex', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('isLoading == trueの時、Loading...が表示される', () => {
    mockColors.mockReturnValue({
      isLoading: true,
      isError: false,
      data: [],
    });
    render(<ColorsIndex />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('isError == trueの時、エラーが表示される', () => {
    mockColors.mockReturnValue({
      isLoading: false,
      isError: true,
      data: [],
    });
    render(<ColorsIndex />);
    expect(screen.getByText('エラー、ファイル、データの確認をしてください')).toBeInTheDocument();
  });

  it('データが空の時、まだ、あなたのデータが作られていません。気分とcolorを登録してみましょう!!が表示される', () => {
    mockColors.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [],
    });
    render(<ColorsIndex />);
    expect(
      screen.getByText('まだ、あなたのデータが作られていません。気分とcolorを登録してみましょう!!')
    ).toBeInTheDocument();
  });

  it('データが存在する時、登録した気分 : "ホカホカ"が表示される', () => {
    mockColors.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 1,
          colorName: '#FF0000',
          mood: 'ホカホカ',
          createdAt: '2026-06-01T12:00:00Z',
          response: {
            aiResponse: 'This is a happy color.',
          },
        },
      ],
    });
    render(<ColorsIndex />);
    expect(screen.getByText('登録した気分 : "ホカホカ"')).toBeInTheDocument();
  });

  it('データが存在する時、AIコメントはまだ生成されていません。が表示される', () => {
    mockColors.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 1,
          colorName: '#FF0000',
          mood: 'ホカホカ',
          createdAt: '2026-06-01T12:00:00Z',
          response: {
            aiResponse: null,
          },
        },
      ],
    });
    render(<ColorsIndex />);
    expect(screen.getByText('AIコメントはまだ生成されていません。')).toBeInTheDocument();
  });

  it('削除ボタンをクリックすると、deleteColorが呼ばれ、トースト通知が表示される', async () => {
    // データが存在する時、deleteColorが呼ばれることを確認するテスト
    mockColors.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: 1,
          colorName: '#FF0000',
          mood: 'ホカホカ',
          createdAt: '2026-06-01T12:00:00Z',
          response: {
            aiResponse: 'This is a happy color.',
          },
        },
      ],
    });
    render(<ColorsIndex />);
    const user = userEvent.setup();
    const deleteButton = screen.getByRole('button', { name: 'この履歴を削除' });
    await user.click(deleteButton);
    expect(mockDeleteColor).toHaveBeenCalledWith(1);
    // deleteColorが呼ばれた後、トースト通知が表示されることを確認する
    expect(toast.success).toHaveBeenCalledWith('履歴を削除しました！');
  });
});
