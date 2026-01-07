import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import LoginSelection from './Home/Login/LoginSelection';
import Login from './Home/Login/Login';
import ProtectAdmin from "./Home/ProtectedRoute/ProtectAdmin";
import ProtectHallTicket from "./Home/ProtectedRoute/ProtectHallTicket";
import HallTicket from './Home/HallTicket/HallTicket';
import ToastProvider from './Toast';
import ProtectInvigilator from './Home/ProtectedRoute/ProtectInvigilator';
import Invigilator from './Invigilator/Invigilator';

function App() {

  return (
    <div className="App">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hallTicket" 
            element={
              <ProtectHallTicket>
                <HallTicket />
              </ProtectHallTicket>
            }
            />
            <Route path="/login" element={<LoginSelection />} />
            <Route path="/login/admin" element={<Login props="Admin" />} />
            <Route path="/login/invigilator" element={<Login props="Invigilator" />} />
            <Route path="/admin/*"
              element={
                <ProtectAdmin>
                  <Admin />
                </ProtectAdmin>
              }
            />
            <Route path="/invigilator/*"
              element={
                <ProtectInvigilator>
                  <Invigilator />
                </ProtectInvigilator>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
