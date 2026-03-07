import { type CreateColorParams } from '@/app/features/colors/types/Color';
import { type Color } from '@/app/features/colors/types/Color';
import { ApiClient } from '@/app/lib/apiClient';

export default function colorsPostData(newColor: CreateColorParams): Promise<Color> {
  return ApiClient.post('/colors', newColor);
}
