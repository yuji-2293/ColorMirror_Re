import { ApiClient } from '@/app/lib/apiClient';

export default function colorsDeleteData(id: number): Promise<void> {
  return ApiClient.delete(`/colors/${id}`);
}
