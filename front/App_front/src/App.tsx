import './App.css';
import { type Color } from './types/Color';
type ApiProps = {
  colorsGetData: () => Promise<Color[]>;
  colorsPostData: () => Promise<Color>;
};
function App({ colorsPostData, colorsGetData }: ApiProps) {
  return (
    <>
      <div className="">
        <button onClick={colorsPostData}>追加</button>
        <button onClick={colorsGetData}>取得</button>
      </div>
    </>
  );
}

export default App;
