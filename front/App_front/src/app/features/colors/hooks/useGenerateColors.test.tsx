import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGenerateColor } from '@/app/features/colors/hooks/useGenerateColors';

const { mockGenerateMoodData } = vi.hoisted(() => ({
  mockGenerateMoodData: vi.fn(),
}));
const mockParams = {
  mood: 'ホカホカ',
};
vi.mock('@/app/features/colors/api/generateMoodData', () => ({
  default: mockGenerateMoodData,
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockResponse = {
  data: {
    generatedColor: [
      {
        hex: '#FF5733',
        name: 'ホカホカ',
      },
    ],
  },
};

mockGenerateMoodData.mockResolvedValue(mockResponse);

describe('useGenerateColors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('generateMoodDataが取得したデータを返すこと', async () => {
    const { result } = renderHook(() => useGenerateColor(), { wrapper });
    result.current.generateColor(mockParams);
    await waitFor(() => {
      expect(result.current.generatedColor).toEqual(mockResponse.data.generatedColor);
    });
  });

  it('generateMoodDataが失敗した場合、エラーを返すこと', async () => {
    mockGenerateMoodData.mockRejectedValueOnce(new Error('API request failed'));
    const { result } = renderHook(() => useGenerateColor(), { wrapper });
    result.current.generateColor(mockParams);
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(new Error('API request failed'));
    });
  });
});
