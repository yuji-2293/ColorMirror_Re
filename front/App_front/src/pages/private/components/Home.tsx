import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
import { ColorsForm } from '@/app/features/colors/components/colorsForm';
import { useState } from 'react';
import { ResponsesForm } from '@/app/features/responses/components/responsesForm';
import { CreateForm } from '@/app/features/responses/components/createForm';

export const Home = () => {
  const [mood, setMood] = useState<string>('');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  return (
    <div className="">
      <h1>ホーム</h1>
      <ColorsForm
        mood={mood}
        setMood={setMood}
        selectedColorName={selectedColorName}
        setSelectedColorName={setSelectedColorName}
      />
      <ColorsIndex />
      <ResponsesForm
        mood={mood}
        selectedColorName={selectedColorName}
        aiResponse={aiResponse}
        setAiResponse={setAiResponse}
      />
      <CreateForm
        mood={mood}
        selectedColorName={selectedColorName}
        aiResponse={aiResponse}
        setAiResponse={setAiResponse}
      />
    </div>
  );
};
