import { ColorsForm } from '@/app/features/colors/components/colorsForm';
import { useCallback, useState } from 'react';
import { ResponsesForm } from '@/app/features/responses/components/responsesForm';
import { CreateForm } from '@/app/features/responses/components/createForm';
import { ColorsFormCard } from '@/app/features/colors/components/colorsFormCard';
import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
import { useGenerateResponse } from '@/app/features/responses/hooks/useGenerateResponse';

import { useGenerateColor } from '@/app/features/colors/hooks/useGenerateColors';
export const Home = () => {
  // mood、selectedColorName、aiResponseの3つの状態を管理するためのuseStateフックを定義する。これらの状態は、ユーザーが入力したムードや選択した色の名前、AIからのレスポンスを保存するために使用される。
  const [mood, setMood] = useState<string>('');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');

  // reset関数を定義する。reset関数は、フォームの状態を初期状態にリセットするための関数である。useCallbackを使用して、コンポーネントが再レンダリングされても同じ関数インスタンスが使用されるようにする。
  const resetAll = useCallback(() => {
    setMood('');
    setSelectedColorName('');
    setAiResponse('');
  }, []);

  // reset関数を呼び出すと、dataの値が初期状態にリセットされる
  const { resetAiResponseData, aiResponseData, generateResponse, isPending, isSuccess } =
    useGenerateResponse();
  //
  const {
    generateColor,
    generatedColor,
    resetColors,
    isPending: colorPending,
    isSuccess: colorSuccess,
  } = useGenerateColor();

  return (
    <div className="">
      {/* 一覧ページへのリンクを表示 */}
      <ColorsFormCard>
        <ColorsForm
          mood={mood}
          setMood={setMood}
          selectedColorName={selectedColorName}
          setSelectedColorName={setSelectedColorName}
          generateColor={generateColor}
          generatedColor={generatedColor}
          resetColors={resetColors}
          isPending={colorPending}
          isSuccess={colorSuccess}
        />

        <ResponsesForm
          mood={mood}
          setMood={setMood}
          selectedColorName={selectedColorName}
          setSelectedColorName={setSelectedColorName}
          aiResponse={aiResponse}
          setAiResponse={setAiResponse}
          resetAll={resetAll}
          resetAiResponseData={resetAiResponseData}
          resetColors={resetColors}
          aiResponseData={aiResponseData}
          generateResponse={generateResponse}
          isPending={isPending}
          isSuccess={isSuccess}
        />

        <CreateForm
          mood={mood}
          selectedColorName={selectedColorName}
          aiResponse={aiResponse}
          setMood={setMood}
          setSelectedColorName={setSelectedColorName}
          setAiResponse={setAiResponse}
          resetAll={resetAll}
          resetAiResponseData={resetAiResponseData}
          resetColors={resetColors}
          aiResponseData={aiResponseData}
          generateResponse={generateResponse}
          isPending={isPending}
          isSuccess={isSuccess}
        />
      </ColorsFormCard>
      <ColorsIndex />
    </div>
  );
};
