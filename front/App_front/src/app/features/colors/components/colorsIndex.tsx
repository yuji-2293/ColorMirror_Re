import { useColors } from '@/app/features/colors/hooks/useColors';

export const ColorsIndex = () => {
  const { isLoading, isError, data } = useColors();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>エラー、ファイル、データの確認をしてください</div>;
  }
  if (data) {
    console.log(data);
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
          </li>
        ))}
      </ul>
    </div>
  );
};
