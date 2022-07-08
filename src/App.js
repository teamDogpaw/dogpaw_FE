import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './styles/style';
import Router from './Routes';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import {  useRecoilValue } from 'recoil';
import { DarkThemeAtom } from './atom/theme';
import axios from 'axios';
import { useQuery } from 'react-query';
import instance from './shared/axios';
import { UserInfoAtom } from './atom/userQuery';

function App() {
  const isDark = useRecoilValue(DarkThemeAtom)

//   const { isLoading, error, data } = useQuery('userinfo', () =>
//   instance.get(`http://13.125.213.81/user/userinfo`)
// )

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
