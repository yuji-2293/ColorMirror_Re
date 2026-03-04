import { useColors } from '@/app/features/colors/hooks/useColors';
import { useCreateColors } from '@/app/features/colors/hooks/useCreateColors';

export const Home = () => {
  const { isLoading, isError, data } = useColors();
  const { createColor } = useCreateColors();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred while fetching colors data.</div>;
  }
  if (data) {
    console.log(data);
  }

  const colors = data?.data || [];

  return (
    <div>
      <h1> Home</h1>
      {/* colorの機能を実装するためのコンポーネント */}

      <button type="button" onClick={() => createColor()}>
        ボタン
      </button>

      {/* 取得した色のデータを表示する例 */}

      <ul>
        <h1>ここに表示する</h1>
        {colors.map((color) => (
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
