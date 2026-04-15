import { type CreateFormProps } from '@/app/features/responses/types/Response';
import { useGenerateResponse } from '@/app/features/responses/hooks/useGenerateResponse';
import { type GenerateResponseDataParams } from '@/app/features/responses/types/Response';
import { useEffect } from 'react';
export const ResponsesForm = ({ mood, selectedColorName, setAiResponse }: CreateFormProps) => {
  const { aiResponseData, generateResponse, isPending } = useGenerateResponse();
  const handleGenerateResponse = () => {
    if (isPending) return;
    const params: GenerateResponseDataParams = {
      response: {
        mood: mood,
        color_name: selectedColorName,
      },
    };
    console.log('paramsの中身:', params);
    generateResponse(params);
  };
  // AIからのレスポンスデータが更新されたときに、親コンポーネントの状態を更新する
  useEffect(() => {
    if (aiResponseData) {
      setAiResponse(aiResponseData);
    }
  }, [aiResponseData, setAiResponse]);

  return (
    <div className="">
      <h1>ResponsesForm</h1>
      <p>{mood}</p>
      <p>{selectedColorName}</p>
      <button
        onClick={handleGenerateResponse}
        disabled={!mood || !selectedColorName || isPending}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        AI生成開始
      </button>

      {isPending && (
        <div className="flex justify-center items-center w-24 h-24 bg-white rounded-2xl shadow-2xl">
          <div
            className="flex justify-center items-center animate-pulse w-20 h-20 border-4 rounded-full"
            role="status"
          >
            <p className="text-center text-sm">生成中...</p>
          </div>
        </div>
      )}

      <p>{aiResponseData}</p>
    </div>
  );
};
