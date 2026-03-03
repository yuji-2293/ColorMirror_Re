import { useQuery } from '@tanstack/react-query';
import colorsGetData from '@/app/features/colors/api/colorsGetData';
import { type ColorResponse } from '@/app/features/colors/types/Color';

export function useColors() {
  const query = useQuery<ColorResponse>({
    queryKey: ['colors'],
    queryFn: colorsGetData,
  });

  return {
    ...query,
  };
}
