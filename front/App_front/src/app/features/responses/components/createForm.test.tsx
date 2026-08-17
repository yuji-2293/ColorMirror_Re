import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { CreateForm } from '@/app/features/responses/components/createForm';
import { type CreateFormProps } from '@/app/features/responses/types/Response';
const { mockCreateResponse, mockUseCreateResponse } = vi.hoisted(() => ({
  mockCreateResponse: vi.fn(),
  mockUseCreateResponse: vi.fn(() => ({
    createResponse: mockCreateResponse,
    isSuccess: false,
    isPending: false,
  })),
}));

vi.mock('@/app/features/responses/hooks/useCreateResponse', () => ({
  useCreateResponse: mockUseCreateResponse,
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
        aiResponseData={defaultProps.aiResponseData}
      />
    );

    const button = screen.getByRole('button', { name: '保存する' });
    expect(button).toBeDisabled();
  });
});
