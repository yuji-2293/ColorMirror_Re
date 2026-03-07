import { useColors } from '@/app/features/colors/hooks/useColors';
import { useDeleteColor } from '@/app/features/colors/hooks/useDeleteColor';

export const ColorsIndex = () => {
  const { isLoading, isError, data } = useColors();
  const { deleteColor } = useDeleteColor();
  const handleDelete = (id: number) => {
    deleteColor(id);
    console.log(`削除対象のid: ${id}`);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>エラー、ファイル、データの確認をしてください</div>;
  }

  const colorsIndex = data || [];

  return (
    <div>
      {/* colorの機能を実装するためのコンポーネント */}
      {/* 取得した色のデータを表示する例 */}
      <ul>
        <h1>ここに表示する</h1>
        {colorsIndex.map((color) => (
          <li key={color.id}>
            <p>色の名前: {color.colorName}</p>
            <p>ムード: {color.mood}</p>
            <p>作成日時: {color.createdAt}</p>
            <button onClick={() => handleDelete(color.id)} className="bg-red-500">
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
