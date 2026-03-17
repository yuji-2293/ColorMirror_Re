import { ColorsCreate } from '@/app/features/colors/components/colorsCreate';
import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
import { ColorsForm } from '@/app/features/colors/components/colorsForm';
export const Home = () => {
  return (
    <div className="">
      <h1>ホーム</h1>
      <ColorsForm />
      <ColorsIndex />
      <ColorsCreate />
    </div>
  );
};
