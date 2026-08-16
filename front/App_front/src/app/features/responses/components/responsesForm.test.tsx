import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ResponsesForm } from '@/app/features/responses/components/responsesForm';
import { type ResponseFormProps } from '@/app/features/responses/types/Response';
const defaultProps: ResponseFormProps = {
  mood: '',
  selectedColorName: '',
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
});
