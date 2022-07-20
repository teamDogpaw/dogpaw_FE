import React, { Suspense} from "react";
import { GlobalStyle } from "./styles/style";
import Router from "./Routes";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { DarkThemeAtom } from "./atom/theme";
import { useQuery } from "react-query";
import instance from "./shared/axios";
import { UserInfoAtom } from "./atom/atom";
import Loading from "./shared/Loading";
import Toggle from "./components/Toggle";


function App() {
  const isDark = useRecoilValue(DarkThemeAtom);
  const token = localStorage.getItem("token");
  const [user, setUser] = useRecoilState(UserInfoAtom);

  const GetUserInfo = async () => {
    if (token) {
      try {
        const response = await instance.get("/user/userinfo");
        const userData = response.data;
        return userData;
      } catch (error) {
        console.log(error);
      }
    }
  }; 
  
  useQuery("userinfo",GetUserInfo,{
    refetchOnWindowFocus: false,
    onSuccess:(data)=>{
      setUser(data)
    }
  })
 

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header />
          <Suspense fallback={<Loading />}>
          <Router/>
          </Suspense>
          <Toggle />
          

      </ThemeProvider>
    </>
  );
}

export default App;
