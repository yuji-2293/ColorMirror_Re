import { ColorsCreate } from '@/app/features/colors/components/colorsCreate';
import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
export const Home = () => {
  return (
    <div>
      <h1>ホーム</h1>
      <ColorsIndex />
      <ColorsCreate />
    </div>
  );
};
