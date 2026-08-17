import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGenerateResponse } from '@/app/features/responses/hooks/useGenerateResponse';

const { mockGenerateResponseData } = vi.hoisted(() => ({
  mockGenerateResponseData: vi.fn(),
}));

vi.mock('@/app/features/responses/api/generateResponseData', () => ({
  default: mockGenerateResponseData,
}));

const mockParams = {
  response: {
    mood: 'ワクワク',
    color_name: '#FF5733',
  },
};

const mockResponse = {
  data: {
    aiResponse: 'This is a happy color.',
  },
};

// mockGenerateResponseDataを使って、generateResponseDataが呼ばれたときにmockResponseを返すように設定する
mockGenerateResponseData.mockResolvedValue(mockResponse);

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGenerateResponse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hook関数を呼ぶとAPI関数が取得したデータを返す', async () => {
    const { result } = renderHook(() => useGenerateResponse(), { wrapper });
    result.current.generateResponse(mockParams);
    await waitFor(() => {
      expect(result.current.aiResponseData).toEqual(mockResponse.data);
    });
  });
  it('hook関数を呼ぶとAPI関数が失敗した場合、エラーを返す', async () => {
    // モックしたAPI関数が失敗するように設定する、その時のエラー文を指定する
    mockGenerateResponseData.mockRejectedValueOnce(new Error('API request failed'));
    // result.current.generateResponseを呼ぶと、mockGenerateResponseDataが呼ばれる,
    // その時にmockRejectedValueOnceで指定したエラー文が返される
    const { result } = renderHook(() => useGenerateResponse(), { wrapper });
    result.current.generateResponse(mockParams);
    await waitFor(() => {
      // 失敗を検知して、isErrorがtrueになることを確認する,toBe判定でtrueなら次の処理に進む
      expect(result.current.isError).toBe(true);
      // 事前に定義したエラー文と一致するかを確認する
      expect(result.current.error).toEqual(new Error('API request failed'));
    });
  });
});
