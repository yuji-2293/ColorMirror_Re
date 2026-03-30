import { type GenerateMoodParams } from '@/app/features/colors/types/Color';
import { useGenerateColor } from '@/app/features/colors/hooks/useGenerateColors';

export const ColorsForm = () => {
  const { generateColor, generatedColor, isPending, isSuccess } = useGenerateColor();

  const handleWordClick = (mood: string) => {
    if (isPending) return;
    const generateMood: GenerateMoodParams = {
      mood: mood,
    };
    console.log('Clickしたmood:', mood);
    generateColor(generateMood);
  };

  return (
    <div className="">
      <p>ここにカラーの新規作成フォームを実装します。</p>
      <div className="flex justify-around items-center">
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

      {isPending && (
        <div className="flex justify-center items-center w-24 h-24 bg-white rounded-2xl shadow-2xl">
          <div
            className="flex justify-center items-center animate-pulse w-20 h-20 border-4 rounded-full"
            role="status"
          >
            <p className="text-center text-sm">生成中...</p>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="bg-white rounded-2xl shadow-2xl opacity-90 mt-4 p-2 flex gap-2 justify-around items-center">
          {generatedColor.map((c) => (
            <div key={c.hex} className="flex flex-col items-center">
              <button className="rounded-full w-20 h-20" style={{ backgroundColor: c.hex }} />
              <p className="text-sm">{c.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
