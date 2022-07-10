import { Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import MyPage from "./pages/Mypage";
import Write from "./pages/Write";
import Login from "./components/Login";
import Register from "./components/Register";
import KakaoLoginRedirect from "./shared/kakaoLoginRedirect";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail/:postId" element={<Detail />} />
      <Route path="/write" element={<Write />} />
      <Route path="/write/:id" element={<Write />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth" element={<KakaoLoginRedirect />}></Route>
    </Routes>
  );
};

export default Router;
