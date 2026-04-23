import { ColorsForm } from '@/app/features/colors/components/colorsForm';
import { useState } from 'react';
import { ResponsesForm } from '@/app/features/responses/components/responsesForm';
import { CreateForm } from '@/app/features/responses/components/createForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export const Home = () => {
  const [mood, setMood] = useState<string>('');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  return (
    <div className="">
      <h1>ホーム</h1>
      {/* 一覧ページへのリンクを表示 */}
      <Link to="index">一覧ページへ</Link>
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
    </div>
  );
};
