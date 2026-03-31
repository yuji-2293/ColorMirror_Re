import { useMutation } from '@tanstack/react-query';
import generateResponseData from '@/app/features/Responses/api/generateResponseData';
import { type AiResponse } from '@/app/features/Responses/types/Response';
import { type GenerateResponseDataParams } from '@/app/features/Responses/types/Response';

export function useGenerateResponse() {
  const mutation = useMutation<AiResponse, Error, GenerateResponseDataParams>({
    mutationFn: (params) => generateResponseData(params),
  });
  const aiResponseData = mutation.data?.data || '';
  console.log(aiResponseData);
  return {
    ...mutation,
    generateResponse: mutation.mutate,
    aiResponseData,
  };
}
