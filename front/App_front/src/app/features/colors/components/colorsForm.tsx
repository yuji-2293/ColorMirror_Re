import { type GenerateMoodParams } from '@/app/features/colors/types/Color';
import { useGenerateColor } from '@/app/features/colors/hooks/useGenerateColors';
import { type ColorsFormProps } from '@/app/features/colors/types/Color';

export const ColorsForm = ({
  mood,
  setMood,
  selectedColorName,
  setSelectedColorName,
}: ColorsFormProps) => {
  const { generateColor, generatedColor, isPending, isSuccess } = useGenerateColor();

  const handleGenerateColor = () => {
    // 生成中の場合はクリックをdisableにする
    if (isPending) return;
    // paramsを作成してAPIリクエストを送る
    const generateMood: GenerateMoodParams = {
      mood: mood,
    };
    console.log('Clickしたmood:', mood);
    // tan Stack Queryのmutate関数を呼び出してAPIリクエストを送る
    generateColor(generateMood);
  };

  return (
    <div className="">
      <p>ここにカラーの新規作成フォームを実装します。</p>
      <p>選択中のmood:{mood}</p>
      <p>選択中のcolor:{selectedColorName}</p>
      <button
        className="rounded-full w-20 h-20 "
        style={{ backgroundColor: selectedColorName }}
      ></button>
      <div className="">
        <button
          className="bg-white rounded-xl shadow-xl w-20 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGenerateColor}
          disabled={!mood || isPending}
        >
          生成開始
        </button>
      </div>

      <div className="flex justify-around items-center">
        <button
          onClick={() => setMood('ワクワク')}
          className="flex items-center justify-center rounded-xl bg-amber-300 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer"
        >
          ワクワク
        </button>
        <button
          onClick={() => setMood('ムカムカ')}
          className="flex items-center justify-center rounded-xl bg-rose-500 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer"
        >
          ムカムカ
        </button>
        <button
          onClick={() => setMood('モヤモヤ')}
          className="flex items-center justify-center rounded-xl bg-indigo-600 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer"
        >
          モヤモヤ
        </button>
        <button
          onClick={() => setMood('ホカホカ')}
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
              <button
                onClick={() => setSelectedColorName(c.hex)}
                className="rounded-full w-20 h-20"
                style={{ backgroundColor: c.hex }}
              />
              <p className="text-sm">{c.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
