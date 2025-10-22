import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Admin from './Admin/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    </div>
  );
}

export default App;
