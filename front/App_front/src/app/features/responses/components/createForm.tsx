import {
  type CreateFormProps,
  type CreateResponseDataParams,
} from '@/app/features/responses/types/Response';
import { useCreateResponse } from '@/app/features/responses/hooks/useCreateResponse';

export const CreateForm = ({ mood, selectedColorName, aiResponse }: CreateFormProps) => {
  const { createResponse, isPending, isSuccess } = useCreateResponse();
  const handleCreateResponse = () => {
    if (isPending) return;
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
  return (
    <div>
      {isPending && (
        <div className="flex justify-center items-center w-24 h-24 bg-white rounded-2xl shadow-2xl">
          <div
            className="flex justify-center items-center animate-pulse w-20 h-20 border-4 rounded-full"
            role="status"
          >
            <p className="text-center text-sm">保存中...</p>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="bg-green-500 text-white rounded-2xl shadow-2xl opacity-90 mt-4 p-2 flex gap-2 justify-around items-center">
          <p>保存が完了しました！</p>
        </div>
      )}
      <button
        onClick={handleCreateResponse}
        className="bg-sky-500 text-white w-20 h-10 rounded-2xl shadow-2xl disabled:bg-gray-400"
        disabled={!mood || !selectedColorName || !aiResponse || isPending}
      >
        保存する
      </button>
    </div>
  );
};
