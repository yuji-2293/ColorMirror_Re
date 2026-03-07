import colorsDeleteData from '@/app/features/colors/api/colorsDeleteData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteColor() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, number>({
    mutationFn: (id) => colorsDeleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
  });
  return {
    ...mutation,
    deleteColor: mutation.mutate,
  };
}
