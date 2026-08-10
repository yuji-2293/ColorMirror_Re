import { describe, it, expect, vi, afterEach } from 'vitest';
import { ApiClient } from '@/app/lib/apiClient';
import colorsGetData from '@/app/features/colors/api/colorsGetData';
import { type ColorResponse } from '@/app/features/colors/types/Color';

describe('colorsGetData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('色一覧を取得できる', async () => {
    const mockResponse: ColorResponse = {
      data: [
        {
          id: 1,
          colorName: '#FF0000',
          mood: 'ホカホカ',
          createdAt: '2026-06-01T12:00:00Z',
          response: {
            aiResponse: 'This is a happy color.',
          },
        },
      ],
    };
    // spyOnを使ってApiClientを監視、mockResolvedValueOnceを使ってモックレスポンスを返すように設定する
    vi.spyOn(ApiClient, 'get').mockResolvedValueOnce(mockResponse);
    // result関数にcolorsGetDataの戻り値を代入
    const result = await colorsGetData();
    // expectでApiClient.getを指定、toHaveBeenCalledWithで('/colors')が呼ばれたことを確認する
    expect(ApiClient.get).toHaveBeenCalledWith('/colors');
    // expectでresultを実行、toEqualでmockResponse.dataと一致することを確認する
    // toEqualはオブジェクトの内容が同じかどうかを比較するマッチャー
    expect(result).toEqual(mockResponse.data);
  });

  it('APIが失敗したケース', async () => {
    // mockRejectedValueOnceを使って、ApiClient.getが呼ばれたときにエラーを返すように設定する
    // new Error('API request failed')でエラーオブジェクトを作成
    // mockRejectedValueOnceに渡すことで,1回だけ Promise.reject(error) を返したことにする
    vi.spyOn(ApiClient, 'get').mockRejectedValueOnce(new Error('API request failed'));
    //.rejects = Promiseが失敗(rejected)した場合のマッチャー, toThrow = 例外が投げられることを確認するマッチャー
    // resolveしたらテストが失敗するので、rejectされた場合にエラーが投げられることを確認する
    await expect(colorsGetData()).rejects.toThrow('API request failed');
  });
});
