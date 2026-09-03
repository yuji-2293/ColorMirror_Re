import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { validateToken } from '@/app/features/auth/api/auth';
import App from '@/App';
import type { ValidateTokenResponse } from '@/app/features/auth/types/authType';
vi.mock('@/app/features/auth/api/auth', () => ({
  validateToken: vi.fn(),
}));

const mockLogin = vi.fn();
const mockLogout = vi.fn();
vi.mock('@/app/store/useAuthStore', () => ({
  useAuthStore: vi.fn(() => ({
    login: mockLogin,
    logout: mockLogout,
    authStatus: 'unknown',
  })),
}));

vi.mock('sonner', () => ({
  Toaster: () => <div>Toaster</div>,
}));

describe('App.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('アプリが起動すると認証の復元処理が実行されること', async () => {
    render(<App />);
    await waitFor(() => {
      expect(validateToken).toHaveBeenCalled();
    });
  });
  it('validateTokenが成功した場合、login関数が呼ばれること', async () => {
    const mockResponse: ValidateTokenResponse = {
      success: true,
      data: {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        uid: 'test-uid',
        provider: 'email',
        allowPasswordChange: true,
      },
    };
    vi.mocked(validateToken).mockResolvedValue(mockResponse);
    render(<App />);
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        id: mockResponse.data.id,
        name: mockResponse.data.name,
      });
    });
  });
  it('validateTokenが失敗した場合、logout関数が呼ばれること', async () => {
    vi.mocked(validateToken).mockRejectedValue(new Error(''));
    render(<App />);
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });
});
