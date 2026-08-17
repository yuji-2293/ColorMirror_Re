import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateForm } from '@/app/features/responses/components/createForm';
import { type CreateFormProps } from '@/app/features/responses/types/Response';
import { toast } from 'sonner';
// mockUseCreateResponseの振る舞いを定義する、本来のhooks自体が返すオブジェクトを返すために定義する
const { mockCreateResponse, mockUseCreateResponse } = vi.hoisted(() => ({
  // createResponseのモック関数を定義する
  mockCreateResponse: vi.fn(),
  mockUseCreateResponse: vi.fn(() => ({
    createResponse: mockCreateResponse,
    isSuccess: false,
    isPending: false,
  })),
}));

// hooks自体をモック化する。
vi.mock('@/app/features/responses/hooks/useCreateResponse', () => ({
  useCreateResponse: mockUseCreateResponse,
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const defaultProps: CreateFormProps = {
  mood: 'ワクワク',
  setMood: vi.fn(),
  selectedColorName: '#FF5733',
  setSelectedColorName: vi.fn(),
  aiResponse: 'AIコメント',
  setAiResponse: vi.fn(),
  resetAll: vi.fn(),
  resetAiResponseData: vi.fn(),
  resetColors: vi.fn(),
  aiResponseData: 'AIコメント',
  generateResponse: vi.fn(),
  isSuccess: false,
  isPending: false,
};

const mockResponseParams = {
  color: {
    mood: 'ワクワク',
    color_name: '#FF5733',
  },
  response: {
    ai_response: 'AIコメント',
  },
};

describe('CreateForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('フォームが表示されるか', () => {
    render(<CreateForm {...defaultProps} />);
    expect(screen.getByText('~STEP3~')).toBeInTheDocument();
  });

  it('isPendingがtrueの時、ボタンが非活性', () => {
    mockUseCreateResponse.mockReturnValue({
      createResponse: mockCreateResponse,
      isSuccess: false,
      isPending: true,
    });
    render(
      <CreateForm
        {...defaultProps}
        mood={defaultProps.mood}
        selectedColorName={defaultProps.selectedColorName}
      />
    );
    const button = screen.getByRole('button', { name: '保存する' });
    expect(button).toBeDisabled();
  });
  it('isPendingがtrueの時、ボタンを押しても処理が走らない', async () => {
    mockUseCreateResponse.mockReturnValue({
      createResponse: mockCreateResponse,
      isSuccess: false,
      isPending: true,
    });
    render(
      <CreateForm
        {...defaultProps}
        mood={defaultProps.mood}
        selectedColorName={defaultProps.selectedColorName}
      />
    );
    const button = screen.getByRole('button', { name: '保存する' });
    const user = userEvent.setup();
    await user.click(button);
    expect(mockCreateResponse).not.toHaveBeenCalled();
  });
  it('isPendingがtrueの時、スピナーが表示される', () => {
    mockUseCreateResponse.mockReturnValue({
      createResponse: mockCreateResponse,
      isSuccess: false,
      isPending: true,
    });
    render(<CreateForm {...defaultProps} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('保存ボタンをクリックすると、paramsを作成して、createResponseが呼ばれる', async () => {
    mockUseCreateResponse.mockReturnValue({
      createResponse: mockCreateResponse,
      isSuccess: false,
      isPending: false,
    });
    render(<CreateForm {...defaultProps} />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: '保存する' });
    await user.click(button);
    expect(mockCreateResponse).toHaveBeenCalledWith(mockResponseParams);
  });
  it('isSuccessがtrueの時、トースト通知が表示される', () => {
    mockUseCreateResponse.mockReturnValue({
      createResponse: mockCreateResponse,
      isSuccess: true,
      isPending: false,
    });
    render(<CreateForm {...defaultProps} />);
    expect(toast.success).toHaveBeenCalledWith('保存が成功しました！');
  });
  it('isSuccessがtrueの時、フォームの状態がリセットされる', () => {
    mockUseCreateResponse.mockReturnValue({
      createResponse: mockCreateResponse,
      isSuccess: true,
      isPending: false,
    });
    render(<CreateForm {...defaultProps} />);
    expect(defaultProps.resetAll).toHaveBeenCalled();
    expect(defaultProps.resetAiResponseData).toHaveBeenCalled();
    expect(defaultProps.resetColors).toHaveBeenCalled();
  });
});
