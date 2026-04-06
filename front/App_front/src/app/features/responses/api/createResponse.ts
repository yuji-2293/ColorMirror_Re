import { type CreateResponseDataParams } from '@/app/features/responses/types/Response';
import { ApiClient } from '@/app/lib/apiClient';
import { type CreateResponse } from '@/app/features/responses/types/Response';

export default async function createResponse(
  params: CreateResponseDataParams
): Promise<CreateResponse> {
  try {
    const response = await ApiClient.post<CreateResponse>('/responses', params);
    return response.data;
  } catch (error) {
    console.error();
    throw error;
  }
}
