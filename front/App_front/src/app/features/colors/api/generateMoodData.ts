import { ApiClient } from '@/app/lib/apiClient';
import { type GenerateResponse } from '@/app/features/colors/types/Color';
import { type GenerateMoodParams } from '@/app/features/colors/types/Color';

export default async function generateMoodData(
  generateMood: GenerateMoodParams
): Promise<GenerateResponse> {
  try {
    const response = await ApiClient.post<GenerateResponse>('/colors/generate', generateMood);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
