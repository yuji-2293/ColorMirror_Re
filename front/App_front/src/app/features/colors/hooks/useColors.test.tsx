import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColors } from '@/app/features/colors/hooks/useColors';

// vi.hoistedを使って、mockColorsGetDataを定義する
const { mockColorsGetData } = vi.hoisted(() => ({
  mockColorsGetData: vi.fn(),
}));

// colorsGetDataモジュールをモック化。colorsGetDataはdefaultエクスポートされているので、defaultプロパティにmockColorsGetDataを割り当てる
// ここまでで、colorsGetDataを呼び出すとmockColorsGetDataが呼ばれるようになる。
// hooksのテストでは、apiの実装をmock化して、hooksの挙動をテストすることができる
vi.mock('@/app/features/colors/api/colorsGetData', () => ({
  default: mockColorsGetData,
}));

// QueryClientを作成し、QueryClientProviderでラップすることで、useQueryが正しく動作するようにする
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// wrapper関数を定義し、renderHookのwrapperオプションに渡すことで、useColorsがQueryClientProviderのコンテキスト内で実行されるようにする
// childrenはReactNode型で、QueryClientProviderの子要素として渡される
// QueryClientProviderでラップされたUIコンポーネントを再現することで、useColorsが正しく動作することを確認できる
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockResponse = {
  data: [
    {
      id: 1,
      colorName: '#FF0000',
      mood: 'ホカホカ',
      createdAt: '2026-06-01T12:00:00Z',
      response: { aiResponse: 'This is a happy color.' },
    },
  ],
};

// mockColorsGetDataを使って、colorsGetDataが呼ばれたときにmockResponseを返すように設定する
mockColorsGetData.mockResolvedValue(mockResponse);

describe('useColors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('colorsGetDataが取得したデータを返すこと', async () => {
    // renderHookを使って、useColorsを呼び出す。wrapperオプションにQueryClientProviderを渡すことで、useQueryが正しく動作するようにする
    const { result } = renderHook(() => useColors(), { wrapper });
    // waitForを使って、非同期処理が完了するまで待つ。result.current.dataがmockResponse.dataと一致することを確認する
    // result.current.dataは、useColorsの戻り値のdataプロパティで、colorsGetDataが取得したデータが格納されている
    // currentは、renderHookが返すオブジェクトのプロパティで、現在のフックの状態を表す
    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse.data);
    });
  });

  it('colorsGetDataが失敗した場合、エラーを返すこと', async () => {
    // mockColorsGetDataを使って、colorsGetDataが呼ばれたときにエラーを返すように設定する
    mockColorsGetData.mockRejectedValueOnce(new Error('API request failed'));
    const { result } = renderHook(() => useColors(), { wrapper });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(new Error('API request failed'));
    });
  });
});
