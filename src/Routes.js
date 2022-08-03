import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import UserPage from './pages/UserPage';
import NotFoundPage from './pages/NotFound';
import ConnectFailedPage from './pages/ConnectFailed';

const Detail = lazy(() => import('./pages/Detail'));
const Main = lazy(() => import('./pages/Main'));
const MyPage = lazy(() => import('./pages/Mypage'));
const Write = lazy(() => import('./pages/Write'));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:postId" element={<Detail />} />
      <Route path="/write" element={<Write />} />
      <Route path="/write/:id" element={<Write />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/:userNickname" element={<UserPage />} />
      <Route path="/notfound" element={<NotFoundPage />} />
      <Route path="/connectfail" element={<ConnectFailedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
