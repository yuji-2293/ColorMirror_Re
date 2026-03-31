import { ApiClient } from '@/app/lib/apiClient';
import { type GenerateResponseDataParams } from '@/app/features/responses/types/response';
import { type AiResponse } from '@/app/features/responses/types/response';

export default async function generateResponseData(
  params: GenerateResponseDataParams
): Promise<AiResponse> {
  try {
    const response = await ApiClient.post<AiResponse>('/responses/generate', params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
