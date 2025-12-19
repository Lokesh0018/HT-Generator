import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Login from './Home/Login/Login';
import ProtectAdmin from "./Home/ProtectedRoute/ProtectAdmin";
import ProtectHallTicket from "./Home/ProtectedRoute/ProtectHallTicket";
import HallTicket from './Home/HallTicket/HallTicket';
import ToastProvider from './Toast';

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token")
  );

  const [verified, setVerified] = useState(
    localStorage.getItem("student")
  );

  return (
    <div className="App">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home setVerified={setVerified}/>} />
            <Route path="/hallTicket" 
            element={
              <ProtectHallTicket isAuth={verified}>
                <HallTicket />
              </ProtectHallTicket>
            }
            />
            <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
            <Route path="/admin/*"
              element={
                <ProtectAdmin isAuth={authToken}>
                  <Admin />
                </ProtectAdmin>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
