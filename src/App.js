import React, { useState } from 'react';
import { GlobalStyle } from './styles/style';
import Router from './Routes';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { useRecoilValue } from 'recoil';
import { DarkThemeAtom } from './atom/theme';


function App() {
  const isDark = useRecoilValue(DarkThemeAtom)
  return (

    <>
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>

      <GlobalStyle />
      <Header />
      <Router />
      </ThemeProvider>
      
    </>
  );
}

export default App;
