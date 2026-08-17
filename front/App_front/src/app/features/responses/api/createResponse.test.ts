import { describe, it, expect, vi } from 'vitest';
import { ApiClient } from '@/app/lib/apiClient';
import createResponse from '@/app/features/responses/api/createResponse';
import { type CreateResponseDataParams } from '@/app/features/responses/types/Response';

describe('createResponse', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockParams: CreateResponseDataParams = {
    color: {
      mood: 'ワクワク',
      color_name: '#FF5733',
    },
    response: {
      ai_response: 'This is a happy color.',
    },
  };

  it('渡されたparamsを正しくAPIに渡している', async () => {
    vi.spyOn(ApiClient, 'post').mockResolvedValueOnce({ data: mockParams });
    const result = await createResponse(mockParams);
    expect(ApiClient.post).toHaveBeenCalledWith('/responses', mockParams);
    expect(result).toEqual(mockParams);
  });

  it('APIが失敗した時、エラーを投げる', async () => {
    vi.spyOn(ApiClient, 'post').mockRejectedValueOnce(new Error('API request failed'));
    await expect(createResponse(mockParams)).rejects.toThrow('API request failed');
  });
});
