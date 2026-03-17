import { useMutation } from '@tanstack/react-query';
import { type GenerateMoodParams } from '@/app/features/colors/types/Color';
import generateMoodData from '@/app/features/colors/api/generateMoodData';
import { type GenerateResponse } from '@/app/features/colors/types/Color';

export function useGenerateColor() {
  const mutation = useMutation<GenerateResponse, Error, GenerateMoodParams>({
    mutationFn: (generateMood) => generateMoodData(generateMood),
  });
  const generatedColor = mutation.data?.data?.generatedColor || '';
  return {
    ...mutation,
    generateColor: mutation.mutate,
    generatedColor,
  };
}
