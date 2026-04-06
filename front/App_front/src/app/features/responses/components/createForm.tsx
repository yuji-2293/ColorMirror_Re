import {
  type CreateFormProps,
  type CreateResponseDataParams,
} from '@/app/features/responses/types/Response';
import { useCreateResponse } from '@/app/features/responses/hooks/useCreateResponse';

export const CreateForm = ({ mood, selectedColorName, aiResponse }: CreateFormProps) => {
  const { createResponse, isPending } = useCreateResponse();
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
      <button
        onClick={handleCreateResponse}
        className="bg-sky-500 text-white w-20 h-10 rounded-2xl shadow-2xl"
      >
        保存する
      </button>
    </div>
  );
};
