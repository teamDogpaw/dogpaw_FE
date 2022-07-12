import { Route, Routes } from "react-router-dom";

// import Detail from "./pages/Detail";
// import Main from "./pages/Main";
// import MyPage from "./pages/Mypage";
// import Write from "./pages/Write";
// import Login from "./components/Login"
// import Register from "./components/Register"
import { lazy } from "react";


const Detail = lazy(()=> import("./pages/Detail"));
const Main = lazy(()=> import("./pages/Main"));
const MyPage = lazy(()=> import("./pages/Mypage"));
const Write = lazy(()=> import("./pages/Write"));
const Login = lazy(()=> import("./components/Login"));
const Register = lazy(()=> import("./components/Register"));
const KakaoLoginRedirect = lazy(()=> import ("./shared/kakaoLoginRedirect"))


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
      <Route path="/user/kakao/login" element={<KakaoLoginRedirect />} />

    </Routes>
  );
};

export default Router;
