import { type GenerateMoodParams } from '@/app/features/colors/types/Color';
import { useGenerateColor } from '@/app/features/colors/hooks/useGenerateColors';

export const ColorsForm = () => {
  const generateColor = useGenerateColor();

  const handleWordClick = (mood: string) => {
    // ここにクリックイベントの処理を実装します。
    const generateMood: GenerateMoodParams = {
      mood: mood,
    };
    console.log('Clickしたmood:', mood);
    generateColor.mutate(generateMood);
  };
  return (
    <div className="bg-rose-300">
      <p>ここにカラーの新規作成フォームを実装します。</p>
      <div className="bg-gray-300 flex justify-around">
        <button
          onClick={() => handleWordClick('ワクワク')}
          className="flex items-center justify-center rounded-xl bg-amber-300 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer"
        >
          ワクワク
        </button>
        <button
          onClick={() => handleWordClick('ムカムカ')}
          className="flex items-center justify-center rounded-xl bg-rose-500 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer"
        >
          ムカムカ
        </button>
        <button
          onClick={() => handleWordClick('モヤモヤ')}
          className="flex items-center justify-center rounded-xl bg-indigo-600 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer"
        >
          モヤモヤ
        </button>
        <button
          onClick={() => handleWordClick('ホカホカ')}
          className="flex items-center justify-center rounded-xl bg-pink-300 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer"
        >
          ホカホカ
        </button>
      </div>
    </div>
  );
};
