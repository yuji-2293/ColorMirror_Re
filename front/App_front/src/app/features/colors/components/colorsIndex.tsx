import { useColors } from '@/app/features/colors/hooks/useColors';
import { useDeleteColor } from '@/app/features/colors/hooks/useDeleteColor';

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
    <div className="">
      {/* colorの機能を実装するためのコンポーネント */}
      {/* 取得した色のデータを表示する例 */}
      <ul className="">
        {colorsIndex.map((color) => (
          <li key={color.id} className="border rounded-xl p-4 shadow-sm space-y-2 my-4">
            <p>
              作成日時:
              {new Date(color.createdAt).toLocaleString('ja-JP')}
            </p>
            <div className="flex items-center gap-4">
              <div>色のプレビュー</div>
              <div
                className="w-10 h-10 rounded-full border shadow-sm"
                style={{ backgroundColor: color.colorName }}
              ></div>
            </div>

            <p>ムード: {color.mood}</p>

            <p className="text-sm leading-relaxed">AIのレスポンス: {color.response.aiResponse}</p>
            <button onClick={() => handleDelete(color.id)} className="bg-red-500">
              この履歴を削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
