import './App.css';
import { type Color } from './types/Color';
type ApiProps = {
  colorsPostData: (e: React.FormEvent<HTMLFormElement>) => Promise<Color>;
};
function App({ colorsPostData }: ApiProps) {
  return (
    <>
      <div className="">
        <form onSubmit={colorsPostData}>
          <input type="text" placeholder="空欄" />
          <button type="submit">追加</button>
        </form>
      </div>
    </>
  );
}

export default App;
