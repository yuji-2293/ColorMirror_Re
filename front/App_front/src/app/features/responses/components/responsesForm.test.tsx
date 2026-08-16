import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResponsesForm } from '@/app/features/responses/components/responsesForm';
import { type ResponseFormProps } from '@/app/features/responses/types/Response';
import { toast } from 'sonner';

const mockResponseParams = {
  response: {
    mood: 'ワクワク',
    color_name: '#FF5733',
  },
};

const defaultProps: ResponseFormProps = {
  mood: 'ワクワク',
  selectedColorName: '#FF5733',
  setAiResponse: vi.fn(),
  aiResponseData: null,
  generateResponse: vi.fn(),
  isPending: false,
  isSuccess: false,
};

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('ResponsesForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('フォームが表示されるか', () => {
    render(<ResponsesForm {...defaultProps} />);
    expect(screen.getByText('~STEP2~')).toBeInTheDocument();
  });

  it('AI生成のためのボタンがクリックされたときに、generateResponseが呼ばれる', async () => {
    render(<ResponsesForm {...defaultProps} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'AI生成開始' });
    await user.click(button);
    expect(defaultProps.generateResponse).toHaveBeenCalledWith(mockResponseParams);
  });
  it('AI生成のためのボタンがクリックされても、paramsが足りない場合は、ボタンを押せない', async () => {
    render(<ResponsesForm {...defaultProps} mood={''} selectedColorName={''} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'AI生成開始' });
    await user.click(button);
    expect(defaultProps.generateResponse).not.toHaveBeenCalled();
  });

  it('isSuccessがtrueのときに、トーストが表示されるか', async () => {
    render(<ResponsesForm {...defaultProps} isSuccess={true} />);
    expect(toast.success).toHaveBeenCalledWith('AIからのレスポンスの生成に成功しました！');
  });
  it('isSuccessがtrueの時に、aiResponseDataが存在していれば表示されるか', async () => {
    render(<ResponsesForm {...defaultProps} isSuccess={true} aiResponseData={'www'} />);
    expect(defaultProps.setAiResponse).toHaveBeenCalledWith('www');
  });
  it('isSuccessがfalseの時に、トーストが表示されないか', async () => {
    render(<ResponsesForm {...defaultProps} isSuccess={false} />);
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('isPendingがtrueの時に、スピナーが表示されるか', async () => {
    render(<ResponsesForm {...defaultProps} isPending={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it('isPendingがtrueの時に、ボタンが押せないか', async () => {
    render(<ResponsesForm {...defaultProps} isPending={true} />);
    const button = screen.getByRole('button', { name: 'AI生成開始' });
    expect(button).toBeDisabled();
  });

  it('aiResponseDataが存在する時、ボタンのテキストが「AIコメント再生成」に変わるか', async () => {
    render(<ResponsesForm {...defaultProps} aiResponseData={'AIコメント'} />);
    const button = screen.getByRole('button', { name: 'AIコメント再生成' });
    expect(button).toBeInTheDocument();
  });
  it('aiResponseDataが存在しない時、ボタンのテキストが「AI生成開始」に変わるか', async () => {
    render(<ResponsesForm {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'AI生成開始' });
    expect(button).toBeInTheDocument();
  });
});
