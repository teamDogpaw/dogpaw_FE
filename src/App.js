
import React, { Suspense, useEffect, useState } from 'react';
import { GlobalStyle } from './styles/style';
import Router from './Routes';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DarkThemeAtom } from './atom/theme';
import Loading from './shared/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';
import instance from './shared/axios';
import { UserInfoAtom } from './atom/userQuery';

function App() {
  const isDark = useRecoilValue(DarkThemeAtom)
  const [isLogin,setIsLogin] = useRecoilState(UserInfoAtom)
  

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header />
          <Suspense fallback={<Loading />}>
          <Router/>
          </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
