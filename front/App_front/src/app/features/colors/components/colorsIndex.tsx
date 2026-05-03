import { useColors } from '@/app/features/colors/hooks/useColors';
import { useDeleteColor } from '@/app/features/colors/hooks/useDeleteColor';
import { Button } from '@/components/ui/button';

export const ColorsIndex = () => {
  // 削除ボタンがクリックされたときの処理
  const { deleteColor } = useDeleteColor();
  const handleDelete = (id: number) => {
    deleteColor(id);
    console.log(`削除対象のid: ${id}`);
  };
  // データの読み込み中やエラーが発生した場合の表示
  const { isLoading, isError, data } = useColors();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>エラー、ファイル、データの確認をしてください</div>;
  }

  const colorsIndex = data || [];
  console.log(colorsIndex);

  return (
    <div className="bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl">
      {/* colorの機能を実装するためのコンポーネント */}
      {/* 取得した色のデータを表示する例 */}
      <ul className="bg-gradient rounded-2xl shadow-2xl border border-white/60 px-6 py-3">
        {colorsIndex.map((color) => (
          <li
            key={color.id}
            className="bg-white/50 rounded-xl p-4 shadow-sm space-y-2 my-4 border border-gray-200"
          >
            <div className="p-2">
              <p className="text-right leading-3">
                作成日時:
                {new Date(color.createdAt).toLocaleString('ja-JP')}
              </p>
            </div>

            <div className="grid grid-cols-2 items-center px-6 py-4 gap-6 border-2 border-gray-200/80 rounded-2xl shadow-2xl">
              <div className="flex flex-col items-center justify-end gap-4">
                <div
                  className="w-30 h-30 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.colorName }}
                ></div>
                <div>登録したcolor</div>
                <p>登録した気分 : "{color.mood}" </p>
              </div>

              <div className="bg-white/80 p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">あなたへのAIからのコメント</p>
                <p className="text-sm leading-relaxed">
                  {color.response?.aiResponse ?? 'AIコメントはまだ生成されていません。'}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => handleDelete(color.id)}
                className="font-bold text-md leading-tight  px-4 py-2 rounded-2xl border-2 border-white/50 hover:scale-110 hover:shadow-2xl transition-transform"
                style={{ backgroundColor: color.colorName }}
              >
                この履歴を削除
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
