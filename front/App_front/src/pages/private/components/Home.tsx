import { ColorsForm } from '@/app/features/colors/components/colorsForm';
import { useState } from 'react';
import { ResponsesForm } from '@/app/features/responses/components/responsesForm';
import { CreateForm } from '@/app/features/responses/components/createForm';
import { ColorsFormCard } from '@/app/features/colors/components/colorsFormCard';
import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
export const Home = () => {
  const [mood, setMood] = useState<string>('');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  return (
    <div className="">
      <h1>ホーム</h1>
      {/* 一覧ページへのリンクを表示 */}
      <ColorsFormCard>
        <ColorsForm
          mood={mood}
          setMood={setMood}
          selectedColorName={selectedColorName}
          setSelectedColorName={setSelectedColorName}
        />

        <ResponsesForm
          mood={mood}
          setMood={setMood}
          selectedColorName={selectedColorName}
          setSelectedColorName={setSelectedColorName}
          aiResponse={aiResponse}
          setAiResponse={setAiResponse}
        />

        <CreateForm
          mood={mood}
          selectedColorName={selectedColorName}
          aiResponse={aiResponse}
          setMood={setMood}
          setSelectedColorName={setSelectedColorName}
          setAiResponse={setAiResponse}
        />
      </ColorsFormCard>
      <ColorsIndex />
    </div>
  );
};
