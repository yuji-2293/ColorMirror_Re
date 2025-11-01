import './App.css';

type ApiProps = {
  colorsGetData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};
function App({ colorsGetData }: ApiProps) {
  return (
    <>
      <div className="">
        <form onSubmit={colorsGetData}>
          <input type="text" placeholder="空欄" />
          <button type="submit">追加</button>
        </form>
      </div>
    </>
  );
}

export default App;
