import { React, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Login from './Home/Login/Login';
import ProtectedRoute from "./Home/ProtectedRoute/ProtectedRoute"
import HallTicket from './Home/HallTicket/HallTicket';
import ToastProvider from './Toast';

function App() {
  const authToken = localStorage.getItem("token");
  const data = [
    {
      "S.no": 1,
      "Id": "233J5A0513",
      "Name": "Munakala Lokesh",
      "Email": "233j5a0513@raghuinstech.com",
      "Branch": "CSE",
      "Year": 4,
      "Semester": 1
    },
    {
      "S.no": 2,
      "Id": "233J5A0513",
      "Name": "Munakala Lokesh",
      "Email": "233j5a0513@raghuinstech.com",
      "Branch": "CSE",
      "Year": 4,
      "Semester": 1
    }
  ];

  return (
    <div className="App">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hallTicket" element={<HallTicket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<ProtectedRoute isAuth={authToken}><Admin /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;
