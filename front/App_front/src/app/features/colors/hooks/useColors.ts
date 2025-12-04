import { useQuery } from '@tanstack/react-query';
import colorsGetData from '@/app/features/colors/api/colorsGetData';

export function useColors() {
  const query = useQuery({
    queryKey: ['colors'],
    queryFn: colorsGetData,
  });
  const handleRefetchColors = () => {
    query.refetch();
  };
  return {
    ...query,
    refetchColors: handleRefetchColors,
  };
}
