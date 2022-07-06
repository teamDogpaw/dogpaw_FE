import React from 'react';
import { GlobalStyle } from './styles/style';
import Router from './Routes';
import Header from './components/Header';


function App() {
  return (

    <div className="App">
      
      <GlobalStyle />
      <Header />
      <Router />
      
    </div>
  );
}

export default App;
