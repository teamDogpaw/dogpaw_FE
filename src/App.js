import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GlobalStyle } from './styles/style';
import Router from './Routes';

function App() {
  return (
    
    <div className="App">
        <GlobalStyle />
      <Router />
    </div>
  );
}

export default App;
