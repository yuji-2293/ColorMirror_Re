import {
  type CreateFormProps,
  type CreateResponseDataParams,
} from '@/app/features/responses/types/Response';
import { useCreateResponse } from '@/app/features/responses/hooks/useCreateResponse';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export const CreateForm = ({
  mood,
  selectedColorName,
  aiResponse,
  resetAll,
  resetAiResponseData,
  resetColors,
}: CreateFormProps) => {
  const { createResponse, isPending, isSuccess } = useCreateResponse();
  const handleCreateResponse = () => {
    if (isPending) return;
    // paramsを作成してAPIリクエストを送る
    const params: CreateResponseDataParams = {
      color: {
        mood: mood,
        color_name: selectedColorName,
      },
      response: {
        ai_response: aiResponse,
      },
    };
    console.log(params);
    createResponse(params);
  };
  // レスポンスの保存に成功したら、フォームの状態をリセットして、トースト通知を表示する
  useEffect(() => {
    if (isSuccess) {
      if (!isSuccess) return;
      // 成功したら、フォームの状態をリセットする
      resetAll();
      resetAiResponseData();
      resetColors();

      // トースト通知を表示する
      toast.success('保存が成功しました！');
    }
  }, [isSuccess, resetAll, resetAiResponseData, resetColors]);
  return (
    <div className="STEP3 flex flex-col items-center justify-center gap-4 bg-emerald-200/90 w-full m-2 p-2 rounded-2xl shadow-2xl border border-white/60 relative">
      <div className="FormHeader">
        <div className="flex flex-col  text-center">
          <p>~STEP3~</p>
          <p>生成されたレスポンスをサーバーに保存する</p>
        </div>

        {isPending && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
            <Spinner />
          </div>
        )}
      </div>

      <div className="my-4">
        <button
          onClick={handleCreateResponse}
          className="w-full  px-12 py-3 bg-emerald-300 text-white rounded-2xl shadow-2xl border-2 border-white font-bold text-xl disabled:bg-gray-300 hover:scale-110 hover:bg-emerald-700 hover:text-white"
          disabled={!mood || !selectedColorName || !aiResponse || isPending}
        >
          保存する
        </button>
      </div>
    </div>
  );
};
