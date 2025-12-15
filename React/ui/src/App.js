import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Login from './Home/Login/Login';
import ProtectedRoute from "./Home/ProtectedRoute/ProtectedRoute";
import HallTicket from './Home/HallTicket/HallTicket';
import ToastProvider from './Toast';

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <div className="App">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hallTicket" element={<HallTicket />} />
            <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
            <Route path="/admin/*"
              element={
                <ProtectedRoute isAuth={!authToken}>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
