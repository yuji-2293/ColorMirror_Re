import { describe, it, expect, vi, afterEach } from 'vitest';
import { ApiClient } from '@/app/lib/apiClient';
import generateMoodData from '@/app/features/colors/api/generateMoodData';

describe('generateMoodData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('渡されたparamsを正しくAPIに渡している', async () => {
    const mockParams = { mood: 'ワクワク' };
    const mockResponse = { colorName: '#FF5733', mood: 'ワクワク' };
    // spyOnを使用して、ApiClient.postを監視して、post通信したら、モックオブジェクトを返すように設定する
    vi.spyOn(ApiClient, 'post').mockResolvedValueOnce({ data: mockResponse });
    // result関数にgenerateMoodDataの戻り値を代入
    const result = await generateMoodData(mockParams);
    // expectでApiClient.postを指定、toHaveBeenCalledWithで('/colors/generate', mockParams)が呼ばれたことを確認する
    expect(ApiClient.post).toHaveBeenCalledWith('/colors/generate', mockParams);
    // expectでresultを実行、toEqualでmockResponseと一致することを確認する
    expect(result).toEqual(mockResponse);
  });

  it('APIが失敗した場合、エラーを投げる', async () => {
    const mockParams = { mood: 'ワクワク' };
    vi.spyOn(ApiClient, 'post').mockRejectedValueOnce(new Error('API request failed'));
    await expect(generateMoodData(mockParams)).rejects.toThrow('API request failed');
  });
});
