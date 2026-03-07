import { useQueryClient, useMutation } from '@tanstack/react-query';
import colorsPostData from '@/app/features/colors/api/colorsPostData';
import { type CreateColorParams } from '@/app/features/colors/types/Color';
import { type Color } from '@/app/features/colors/types/Color';
export function useCreateColors() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Color, Error, CreateColorParams>({
    mutationFn: (newColor) => colorsPostData(newColor),

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
