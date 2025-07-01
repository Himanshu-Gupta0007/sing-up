// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/auth/authSlice'; // ✅ Sahi path
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

 

  

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // ✅ 2 sec baad redirect to dashboard
    }
  }, [user, navigate]);

  return (
   
 <>
 <div className="status-container">
  <h2>🔐 Login</h2>

  {/* ⏳ Loading */}
  {loading && (
    <div className="status-message status-loading">
      <span>⏳</span>
      Logging in... Please wait
    </div>
  )}

  {/* ❌ Error */}
  {error && !loading && (
    <div className="status-message status-error">
      <span>❌</span>
      Login failed: {error}
    </div>
  )}

  {/* ✅ Success */}
  {user && !loading && (
    <div className="status-message status-success">
      <span>✅</span>
      Login successful! Welcome <span className="font-bold">{user.username}</span>
    </div>
  )}
</div>


 
 
 </>

  );
};

export default LoginPage;
