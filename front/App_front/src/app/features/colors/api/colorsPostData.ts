import { type Color } from '../types/Color';
import { ApiClient } from '@/app/lib/apiClient';

export default function colorsPostData(): Promise<Color> {
  return ApiClient.post('/colors', {
    color_name: '#FFF000',
    mood: 'ワクワク',
  });
}
