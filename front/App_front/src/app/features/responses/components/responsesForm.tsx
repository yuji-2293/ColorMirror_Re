import { type ColorsFormProps } from '@/app/features/colors/types/Color';

export const ResponsesForm = ({ mood, selectedColor }: ColorsFormProps) => {
  return (
    <div className="">
      <h1>ResponsesForm</h1>
      <p>{mood}</p>
      <p>{selectedColor}</p>
    </div>
  );
};
