import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './styles/style';
import Router from './Routes';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DarkThemeAtom } from './atom/theme';
import axios from 'axios';
import { useQuery } from 'react-query';
import { UserInfoAtom } from './atom/userQuery';
import { instance } from './shared/axios';


function App() {
  const isDark = useRecoilValue(DarkThemeAtom)
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom)

  const GetUserInfo = async () => {
    return await instance.get("http://13.125.213.81/user/userinfo")
 }

 const ReaduserInfo = useQuery('userinfo', GetUserInfo)

 useEffect(()=>{
  setUserInfo(ReaduserInfo.data?.data[0])
},[])

  return (

    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header />
        <Router userinfo={userInfo} />
      </ThemeProvider>

    </>
  );
}

export default App;
