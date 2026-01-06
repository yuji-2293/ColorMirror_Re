import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <div>
      <h1> Home page </h1>
      <Link to="signIn">ログイン</Link>
      <Link to="signOut">ログアウト</Link>
    </div>
  );
};
