import { describe, it, expect, vi } from 'vitest';
import { ApiClient } from '@/app/lib/apiClient';
import generateResponseData from '@/app/features/responses/api/generateResponseData';

describe('generateResponseData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockParams = {
    response: {
      mood: 'ワクワク',
      color_name: '#FF5733',
    },
  };

  it('渡されたparamsを正しくAPIに渡している', async () => {
    vi.spyOn(ApiClient, 'post').mockResolvedValueOnce({ data: mockParams });
    const result = await generateResponseData(mockParams);
    expect(ApiClient.post).toHaveBeenCalledWith('/responses/generate', mockParams);
    expect(result).toEqual(mockParams);
  });
  it('APIが失敗した時、エラーを投げる', async () => {
    vi.spyOn(ApiClient, 'post').mockRejectedValueOnce(new Error('API request failed'));
    await expect(generateResponseData(mockParams)).rejects.toThrow('API request failed');
  });
});
