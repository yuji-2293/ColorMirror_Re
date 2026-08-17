import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateResponse } from '@/app/features/responses/hooks/useCreateResponse';

const { mockCreateResponse } = vi.hoisted(() => ({
  mockCreateResponse: vi.fn(),
}));

vi.mock('@/app/features/responses/api/createResponse', () => ({
  default: mockCreateResponse,
}));

const mockParams = {
  color: {
    mood: 'ワクワク',
    color_name: '#FF5733',
  },
  response: {
    ai_response: 'This is a happy color.',
  },
};

const mockResponse = {
  data: {
    mood: 'ワクワク',
    color_name: '#FF5733',
    createdAt: '2026-06-01T12:00:00Z',
    response: { aiResponse: 'This is a happy color.' },
  },
};

mockCreateResponse.mockResolvedValue(mockResponse);

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCreateResponse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('hook関数を呼ぶとAPI関数が取得したデータを返す', async () => {
    const { result } = renderHook(() => useCreateResponse(), { wrapper });
    result.current.createResponse(mockParams);
    await waitFor(() => {
      expect(result.current.createResponseData).toEqual(mockResponse.data);
    });
  });
  it('hook関数を呼ぶとAPI関数が失敗した場合、エラーを返す', async () => {
    mockCreateResponse.mockRejectedValueOnce(new Error('API 失敗だよ'));
    const { result } = renderHook(() => useCreateResponse(), { wrapper });
    result.current.createResponse(mockParams);
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(new Error('API 失敗だよ'));
    });
  });
});
