import { useState } from 'react';
import { useCreateColors } from '@/app/features/colors/hooks/useCreateColors';
import { type CreateColorParams } from '@/app/features/colors/types/Color';

export const ColorsCreate = () => {
  const createColors = useCreateColors();

  const [colorName, setColorName] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでカラーの新規作成の処理を実装します。
    console.log('カラーの名前:', colorName);
    console.log('ムード:', mood);
    const newColor: CreateColorParams = {
      color: {
        colorName: colorName,
        mood: mood,
      },
    };
    console.log('新しいカラーのデータ:', newColor);
    createColors.mutate(newColor);
  };
  return (
    <div className="bg-amber-300">
      <p>ここにカラーの新規作成フォームを実装します。</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="colorName">色の名前:</label>
          <input
            type="text"
            id="colorName"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mood">ムード:</label>
          <input type="text" id="mood" value={mood} onChange={(e) => setMood(e.target.value)} />
        </div>
        <button type="submit">作成</button>
      </form>
    </div>
  );
};
