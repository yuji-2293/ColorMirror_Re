import { ApiClient } from '@/app/lib/apiClient';
import { type GenerateResponse } from '@/app/features/colors/types/Color';

export default function generateMoodData(
  generateMood: GenerateResponse
): Promise<GenerateResponse> {
  return ApiClient.post('/colors/generate', generateMood);
}
