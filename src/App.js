import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './styles/style';
import Router from './Routes';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import {  useRecoilState, useRecoilValue } from 'recoil';
import { DarkThemeAtom } from './atom/theme';
import axios from 'axios';
import { useQuery } from 'react-query';
import instance from './shared/axios';
import { UserInfoAtom } from './atom/userQuery';

function App() {
  const isDark = useRecoilValue(DarkThemeAtom)
  const [isLogin,setIsLogin] = useRecoilState(UserInfoAtom)
//console.log(isLogin)

useEffect(()=>{
  const token = localStorage.getItem("accesToken");
  if(token){
    instance.defaults.headers.common["Authorization"] =  `Bearer ${token}`
  }
},[])

  const { isLoading, error, data } = useQuery('userinfo', () =>
  instance.get(`http://3.35.22.190/user/userinfo`),{
    refetchOnWindowFocus: false,
    onSuccess:(data)=>{
      setIsLogin(data.data)
    }
  }
)

  return (

    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header />
        <Router  />
      </ThemeProvider>

    </>
  );
}

export default App;
