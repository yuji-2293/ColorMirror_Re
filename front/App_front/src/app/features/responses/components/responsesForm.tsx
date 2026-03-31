import { type ColorsFormProps } from '@/app/features/colors/types/Color';
import { useGenerateResponse } from '@/app/features/responses/hooks/useGenerateResponse';
import { type GenerateResponseDataParams } from '@/app/features/responses/types/Response';
export const ResponsesForm = ({ mood, selectedColor }: ColorsFormProps) => {
  const { aiResponseData, generateResponse, isPending } = useGenerateResponse();
  const handleGenerateResponse = () => {
    if (isPending) return;
    const params: GenerateResponseDataParams = {
      mood,
      selectedColor,
    };
    console.log('paramsの中身:', params);
    generateResponse(params);
  };
  return (
    <div className="">
      <h1>ResponsesForm</h1>
      <p>{mood}</p>
      <p>{selectedColor}</p>
      <button onClick={handleGenerateResponse}>
        AI生成開始 disabled={(!mood && !selectedColor) || isPending}
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
