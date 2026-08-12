import { render, screen } from '@testing-library/react';
import { ColorsForm } from '@/app/features/colors/components/colorsForm';
import { type ColorsFormProps } from '@/app/features/colors/types/Color';
import { vi } from 'vitest';
import { toast } from 'sonner';
import userEvent from '@testing-library/user-event';
import { type generateColors } from '@/app/features/colors/types/Color';
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
  isLoading: false,
};

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockResponse: generateColors = {
  hex: '#FF5733',
  name: 'Vibrant Orange',
};

describe('ColorsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('フォームが表示されるか', () => {
    render(<ColorsForm {...defaultProps} />);
    expect(screen.getByText('気分を入力してcolorを作成')).toBeInTheDocument();
  });

  it('クリックするとsetMoodが呼ばれる', async () => {
    render(<ColorsForm {...defaultProps} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'ワクワク' });
    await user.click(button);
    expect(defaultProps.setMood).toHaveBeenCalledWith('ワクワク');
  });

  it('気分ボタンをクリックすると、生成色と選択中の色がリセットされる', async () => {
    render(<ColorsForm {...defaultProps} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'ワクワク' });
    await user.click(button);
    expect(defaultProps.resetColors).toHaveBeenCalled();
    expect(defaultProps.setSelectedColorName).toHaveBeenCalledWith('');
  });

  it('気分が未選択の場合、色の生成ボタンをクリックしようとしても生成ボタンは無効', async () => {
    render(<ColorsForm {...defaultProps} />);
    const user = userEvent.setup();
    const generateButton = screen.getByRole('button', { name: '生成開始' });
    await user.click(generateButton);
    expect(defaultProps.generateColor).not.toHaveBeenCalled();
  });

  it('色生成のためのparamsが正しく渡されて、正常に1度だけgenerateColorが呼ばれるか', async () => {
    render(<ColorsForm {...defaultProps} mood="ワクワク" />);
    const user = userEvent.setup();
    const generateButton = screen.getByRole('button', { name: '生成開始' });
    await user.click(generateButton);
    expect(defaultProps.generateColor).toHaveBeenCalledWith({ mood: 'ワクワク' });
    expect(defaultProps.generateColor).toHaveBeenCalledTimes(1);
  });

  it('生成中の場合、loadingのためのspinnerが表示されるか', () => {
    render(<ColorsForm {...defaultProps} isPending={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('isSuccessがtrueの場合、トースト通知が表示されるか', () => {
    render(<ColorsForm {...defaultProps} isSuccess={true} />);
    expect(toast.success).toHaveBeenCalledWith(
      '色の生成に成功しました！ 好きな色を選択して、次のSTEPに進みましょう!'
    );
  });

  it('isSuccessがtrueの場合、setSelectedColorNameが空文字で呼ばれるか', () => {
    render(<ColorsForm {...defaultProps} isSuccess={true} />);
    expect(defaultProps.setSelectedColorName).toHaveBeenCalledWith('');
  });

  it('isSuccessがfalseの場合、トースト通知は表示されないか', () => {
    render(<ColorsForm {...defaultProps} isSuccess={false} />);
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('generatedColorが空配列の時、生成ボタンのUIは「生成開始」と表示されるか', () => {
    render(<ColorsForm {...defaultProps} generatedColor={[]} />);
    expect(screen.getByRole('button', { name: '生成開始' })).toBeInTheDocument();
  });

  it('generatedColorが空配列でない時、生成ボタンのUIは「再生成」と表示されるか', () => {
    render(<ColorsForm {...defaultProps} generatedColor={[mockResponse]} />);
    expect(screen.getByRole('button', { name: '再生成' })).toBeInTheDocument();
  });
});
