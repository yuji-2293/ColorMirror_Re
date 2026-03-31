import { type ColorsFormProps } from '@/app/features/colors/types/Color';
import { useGenerateResponse } from '@/app/features/Responses/hooks/useGenerateResponse';
import { type GenerateResponseDataParams } from '@/app/features/Responses/types/Response';
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
      <button onClick={handleGenerateResponse}>AI生成開始</button>
      <p>{aiResponseData}</p>
    </div>
  );
};
