import { type Color } from '../types/Color';
import { API_BASE_URL } from './config';

export default async function colorsPostData(): Promise<Color> {
  const response = await fetch(`${API_BASE_URL}/api/v1/colors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      color_name: 'blue',
      mood: 'モヤモヤ',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to post color data');
  }
  const res = await response.json();
  console.log(res);
  return res;
}
