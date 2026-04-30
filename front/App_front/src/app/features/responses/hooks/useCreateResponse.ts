import { useMutation, useQueryClient } from '@tanstack/react-query';
import createResponse from '@/app/features/responses/api/createResponse';
import {
  type CreateResponse,
  type CreateResponseDataParams,
} from '@/app/features/responses/types/Response';
export function useCreateResponse() {
  const queryClient = useQueryClient();
  const mutation = useMutation<CreateResponse, Error, CreateResponseDataParams>({
    mutationFn: (params) => createResponse(params),
    onSuccess: () => {
      // 成功した場合の処理（例: キャッシュの更新や通知の表示など）
      // ここでは、useColorsのカスタムhookに設定したquerykeyを元に'colors'クエリのキャッシュを無効化して、最新のデータを取得しています。
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
  });
  const createResponseData = mutation.data?.data || null;
  console.log(createResponseData);
  return {
    ...mutation,
    createResponse: mutation.mutate,
    createResponseData,
  };
}
