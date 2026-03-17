import { useMutation } from '@tanstack/react-query';
import { type GenerateMoodParams } from '@/app/features/colors/types/Color';
import generateMoodData from '@/app/features/colors/api/generateMoodData';
import { type GenerateResponse } from '@/app/features/colors/types/Color';

export function useGenerateColor() {
  const mutation = useMutation<GenerateResponse, Error, GenerateMoodParams>({
    mutationFn: (generateMood) => generateMoodData(generateMood),

    onSuccess: (data) => {
      console.log('Color 生成成功結果:', data);
    },
  });
  const generatedColor = mutation.data || '';
  return {
    ...mutation,
    generateColor: mutation.mutate,
    generatedColor,
  };
}
