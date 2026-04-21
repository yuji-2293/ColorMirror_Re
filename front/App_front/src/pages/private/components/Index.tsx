import { Link } from 'react-router-dom';
import { ColorsIndex } from '@/app/features/colors/components/colorsIndex';
export const Index = () => {
  return (
    <div className="">
      <h1>インデックス</h1>
      <Link to="/">Homeへ</Link>
      <ColorsIndex />
    </div>
  );
};
