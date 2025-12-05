import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Login from './Home/Login/Login';
import ProtectedRoute from "./Home/ProtectedRoute/ProtectedRoute"

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
  const flag = false;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<ProtectedRoute isAuth={authToken}><Admin /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      {data.map((item,index) => {
  return (
    <div className="radio-input" key={index}>
      <label className={flag ? "approve" : ""}>
        <input
          name={`value-radio-${index}`}
          type="radio"
        />
        <span>Approve</span>
      </label>

      <label className={!flag ? "reject" : ""}>
        <input
          name={`value-radio-${index}`}
          type="radio"
        />
        <span>Reject</span>
      </label>

      <span className="selection"></span>
    </div>
  );
})}

    </div>
  );
}

export default App;
