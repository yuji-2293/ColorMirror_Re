import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
import { ColorsForm } from '@/app/features/colors/components/colorsForm';
import { useState } from 'react';
import { ResponsesForm } from '@/app/features/responses/components/responsesForm';

export const Home = () => {
  const [mood, setMood] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  return (
    <div className="">
      <h1>ホーム</h1>
      <ColorsForm
        mood={mood}
        setMood={setMood}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <ColorsIndex />
      <ResponsesForm
        mood={mood}
        setMood={setMood}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </div>
  );
};
