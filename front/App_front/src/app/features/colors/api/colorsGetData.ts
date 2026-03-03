import { ApiClient } from '@/app/lib/apiClient';
import { type ColorResponse } from '@/app/features/colors/types/Color';

export default async function colorsGetData(): Promise<ColorResponse> {
  try {
    const response = await ApiClient.get<ColorResponse>('/colors');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
