import GameRoom from "./pages/GameRoom";
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Result from "./pages/Result";

const Router = () => {
    return (
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/lobby" element={<Lobby />} />
         <Route path="/room/:roomID" element={<GameRoom />} />
         <Route path="/result" element={<Result />} />
       </Routes>
    )
   }
   
   export default Router;