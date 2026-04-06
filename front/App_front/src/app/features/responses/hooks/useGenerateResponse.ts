import { useMutation } from '@tanstack/react-query';
import generateResponseData from '@/app/features/responses/api/generateResponseData';
import { type AiResponse } from '@/app/features/responses/types/Response';
import { type GenerateResponseDataParams } from '@/app/features/responses/types/Response';

export function useGenerateResponse() {
  const mutation = useMutation<AiResponse, Error, GenerateResponseDataParams>({
    mutationFn: (params) => generateResponseData(params),
  });
  const aiResponseData = mutation.data?.data || '';
  return {
    ...mutation,
    generateResponse: mutation.mutate,
    aiResponseData,
  };
}
