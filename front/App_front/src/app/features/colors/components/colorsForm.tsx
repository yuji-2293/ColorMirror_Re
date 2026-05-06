import { type GenerateMoodParams } from '@/app/features/colors/types/Color';
import { type ColorsFormProps } from '@/app/features/colors/types/Color';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
export const ColorsForm = ({
  mood,
  setMood,
  selectedColorName,
  setSelectedColorName,
  generateColor,
  generatedColor,
  resetColors,
  isPending,
  isSuccess,
}: ColorsFormProps) => {
  // const { generateColor, generatedColor, resetColors, isPending, isSuccess } = useGenerateColor();

  const handleGenerateColor = () => {
    // 生成中の場合はクリックを無効にする
    if (isPending) return;
    // paramsを作成してAPIリクエストを送る
    const generateMood: GenerateMoodParams = {
      mood: mood,
    };
    // tan Stack Queryのmutate関数を呼び出してAPIリクエストを送る
    generateColor(generateMood);
  };

  // moodを更新したら、依存関係にあるAPI通信で生成された色のデータをリセットする
  const handleMoodSelect = (newMood: string) => {
    setMood(newMood);
    setSelectedColorName('');
    resetColors();
  };

  // 生成に成功したら、トースト通知を表示して、選択された色の名前をリセットする
  useEffect(() => {
    if (isSuccess) {
      toast.success('色の生成に成功しました！ 好きな色を選択して、次のSTEPに進みましょう！');
      setSelectedColorName('');
    }
  }, [isSuccess, setSelectedColorName]);

  return (
    <div className="STEP1 bg-pink-200/90 w-full m-2 p-2 rounded-2xl shadow-2xl border border-white/60 relative">
      {/* 通信中に表示するloadingアニメーション*/}
      {isPending && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
          <Spinner />
        </div>
      )}

      <div className="FormHeader">
        <div className="flex flex-col text-center">
          <p>~STEP1~</p>
          <p>気分を入力してcolorを作成</p>
        </div>
      </div>

      <div className="FormContent flex flex-col items-center justify-center">
        <div className="sm:flex sm:justify-around sm:items-center grid grid-cols-2">
          <button
            onClick={() => handleMoodSelect('ワクワク')}
            className="flex items-center justify-center rounded-xl bg-amber-300 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer border-2 border-white focus:border-gray-300 focus:border-4 active:shadow-2xl focus:scale-120 focus-rounded-2xl transition-transform hover:bg-accent"
          >
            ワクワク
          </button>
          <button
            onClick={() => handleMoodSelect('ムカムカ')}
            className="flex items-center justify-center rounded-xl bg-rose-500 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer border-2 border-white focus:border-gray-300 focus:border-4 active:shadow-2xl focus:scale-120 focus-rounded-2xl transition-transform hover:bg-accent"
          >
            ムカムカ
          </button>
          <button
            onClick={() => handleMoodSelect('モヤモヤ')}
            className="flex items-center justify-center rounded-xl bg-indigo-600 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer border-2 border-white focus:border-gray-300 focus:border-4 active:shadow-2xl focus:scale-120 focus-rounded-2xl transition-transform hover:bg-accent"
          >
            モヤモヤ
          </button>
          <button
            onClick={() => handleMoodSelect('ホカホカ')}
            className="flex items-center justify-center rounded-xl bg-pink-300 w-30 h-10 m-5 p-5 shadow-2xl cursor-pointer border-2 border-white focus:border-gray-300 focus:border-4 active:shadow-2xl focus:scale-120 focus-rounded-2xl transition-transform hover:bg-accent"
          >
            ホカホカ
          </button>
        </div>
        <div className="flex items-center justify-around">
          {/* 気分を元にcolorを生成する関数を実行するbutton */}
          <button
            className="w-full px-12 py-3 bg-cyan-300 text-white rounded-2xl shadow-2xl border-2 border-white font-bold text-xl disabled:bg-gray-300 hover:scale-110 hover:bg-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerateColor}
            disabled={!mood || isPending}
          >
            {/* generatedColorはAPI通信で返ってくるデータの名前 */}
            {/* generatedColorがデータとして返ってきており、配列の要素数が１つ以上（存在するかどうか）であるかどうかを評価して表記を分岐する */}
            {generatedColor.length > 0 ? '再生成' : '生成開始'}
          </button>
        </div>
      </div>

      <div className="flex items-center sm:justify-around justify-center flex-col text-sm leading-relaxed border-2 border-accent rounded-xl p-4 shadow-sm space-y-2 my-4">
        <div className="w-full sm:max-w-1/3 max-w-3xl m-2 p-2 text-center text-sm border-2 border-accent rounded-2xl shadow-2xl">
          <p>
            選択中の気分:
            {mood}
          </p>
          <p>
            選択中のcolor:
            {selectedColorName}
          </p>

          {selectedColorName ? (
            <div
              className="rounded-full sm:w-20 sm:h-20 w-10 h-10 mx-auto border-2 border-white shadow-sm"
              style={{ backgroundColor: selectedColorName }}
            ></div>
          ) : (
            <p>`colorが未選択です`</p>
          )}
        </div>

        {/* 通信後生成に成功したら表示される */}
        {isSuccess && (
          <div className="bg-white w-full rounded-2xl shadow-2xl opacity-90 mt-4 p-2 flex flex-col sm:flex-row gap-2 justify-around items-center">
            <div>
              <p className="text-xs block sm:hidden">colorを選択してください</p>
            </div>

            <div className="flex items-center justify-around gap-2">
              {generatedColor.map((c) => (
                <div key={c.hex} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => setSelectedColorName(c.hex)}
                    className="rounded-full border border-gray-300 sm:w-30 w-10  sm:h-30 h-10 hover:scale-110 hover:shadow-2xl transition-transform"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-sm hidden sm:block wrap-break-word">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
