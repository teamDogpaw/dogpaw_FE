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


function App() {
  const isDark = useRecoilValue(DarkThemeAtom)
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom)

  const GetUserInfo = async () => {
    return await axios.get(`http://localhost:5000/userinfo`)
 }

 const ReaduserInfo = useQuery('userinfo', GetUserInfo)

 useEffect(()=>{
  setUserInfo(ReaduserInfo.data?.data[0])
},[ReaduserInfo])

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
