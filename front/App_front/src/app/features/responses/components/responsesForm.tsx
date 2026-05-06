import { type CreateFormProps } from '@/app/features/responses/types/Response';
import { type GenerateResponseDataParams } from '@/app/features/responses/types/Response';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
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
    <div className="STEP2 flex flex-col items-center justify-center bg-sky-200/90 w-full m-2 p-2 rounded-2xl shadow-2xl border border-white/60 relative">
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
          className="w-full px-10 py-4 bg-cyan-300 text-white rounded-2xl shadow-2xl border-2 border-white font-bold text-xl disabled:bg-gray-300 hover:scale-110 hover:bg-pink-300"
        >
          {aiResponseData.length > 0 ? 'AIコメント再生成' : 'AI生成開始'}
        </button>

        {isPending && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
            <Spinner />
          </div>
        )}
      </div>

      {isSuccess && (
        <div className=" sm:max-w-1/2 w-full bg-white/80 border border-gray-200 rounded-2xl shadow-2xl m-4 py-4 px-8 flex flex-col gap-2 justify-center items-center">
          <p className="text-xs text-gray-500 mb-2">あなたへのAIからのコメント</p>
          <p className="whitespace-pre-line text-sm leading-relaxed">{aiResponseData}</p>
        </div>
      )}
    </div>
  );
};
