import { ApiClient } from '@/app/lib/apiClient';

export default function colorsGetData() {
  return ApiClient.get('/colors');
}
