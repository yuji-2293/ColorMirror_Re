import { useQueryClient, useMutation } from '@tanstack/react-query';
import colorsPostData from '@/app/features/colors/api/colorsPostData';

export function useCreateColors() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: colorsPostData,

    onSuccess: (data) => {
      console.log('Color 作成成功結果:', data);
      queryClient.invalidateQueries({ queryKey: ['colors'] });
    },
  });

  return {
    ...mutation,
    createColor: mutation.mutate,
  };
}
