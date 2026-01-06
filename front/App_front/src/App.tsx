import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ユーザー認証機能用ページコンポーネント
import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp';
import { SignOut } from '@/pages/SignOut';
import { Layout } from '@/pages/Layout';
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signOut" element={<SignOut />} />
            <Route path="*" element={<h1>StatusCode-404 Not Found Page</h1>} />
          </Route>
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}
