// src/App.jsx
import React from 'react';
import SignupPage from './pages/signup';
import Dashboard from './LoginPage';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {
  return (
    <div> 
   
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
