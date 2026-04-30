import { type CreateFormProps } from '@/app/features/responses/types/Response';
import { type GenerateResponseDataParams } from '@/app/features/responses/types/Response';
import { useEffect } from 'react';
import { toast } from 'sonner';
export const ResponsesForm = ({
  mood,
  selectedColorName,
  setAiResponse,
  aiResponseData,
  generateResponse,
  isPending,
  isSuccess,
}: CreateFormProps) => {
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
  // HomeコンポーネントでsetAiResponseを渡しているため、ここでAIからのレスポンスデータを更新することで、Homeコンポーネントの状態も更新される
  useEffect(() => {
    if (aiResponseData) {
      setAiResponse(aiResponseData);
    }
  }, [aiResponseData, setAiResponse]);
  useEffect(() => {
    if (isSuccess) {
      if (!isSuccess) return;
      toast.success('AIからのレスポンスの生成に成功しました！');
    }
  }, [isSuccess]);

  return (
    <div className="STEP2 bg-sky-200 w-full m-2 p-2 rounded-2xl shadow-2xl">
      <div className="FormHeader">
        <div className="flex flex-col  text-center">
          <p>~STEP2~</p>
          <p>選択したColorを基にAIにコメントを生成を依頼</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 m-4">
        <button
          onClick={handleGenerateResponse}
          disabled={!mood || !selectedColorName || isPending}
          className="w-full max-w-1/3 px-12 py-3 bg-cyan-300 text-white rounded-2xl shadow-2xl border-2 border-white font-bold text-xl disabled:bg-gray-300 hover:scale-110 hover:bg-pink-300"
        >
          {aiResponseData.length > 0 ? 'AIコメント再生成' : 'AI生成開始'}
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
      </div>

      {isSuccess && (
        <div className="bg-white rounded-2xl shadow-2xl opacity-90 mt-4 p-2 flex flex-col gap-2 justify-around items-center text-sm leading-relaxed">
          <p>{aiResponseData}</p>
        </div>
      )}
    </div>
  );
};
