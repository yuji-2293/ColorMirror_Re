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
    console.log('TanStackQueryでdataの取得成功');
  }

  return (
    <div>
      <h1> Home</h1>
      {/* colorの機能を実装するためのコンポーネント */}

      <button type="button" onClick={() => createColor()}>
        ボタン
      </button>
    </div>
  );
};
