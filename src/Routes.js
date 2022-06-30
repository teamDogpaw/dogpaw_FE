
import { Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import MyPage from "./pages/Mypage";
import Write from "./pages/Write";

const Router = () => {
    return (
       <Routes>
         <Route path="/" element={<Main />} />
         <Route path="/detail/:id" element={<Detail />} />
         <Route path="/write/:id" element={<Write />} />
         <Route path="/mypage/*" element={<MyPage />} />
       </Routes>
    )
   }
   
   export default Router;