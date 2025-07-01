
// src/pages/SignupPage.jsx
import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';





 

const SignupPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();
    const navigate = useNavigate();
   const { user, loading, error } = useSelector((state) => state.auth);

useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    dispatch(signup(form));
  };

  return (
    <>
    <div className="signup-container">
  <h1 className='signup-heading'>
  Start your adventure  Sign up or Login now
</h1>


  {error && <p className="error">{error}</p>}
  {user && (
    <p className="success">
      Signup successful! Welcome {user.username}
    </p>
  )}

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="username"
      placeholder="Username"
      value={form.username}
      onChange={handleChange}
      autoComplete="username"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      autoComplete="email"
      required
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      autoComplete="current-password"
      required
    />

    <button type="submit" disabled={loading}>
      {loading ? 'Signing up...' : 'Signup'}
    </button>
  </form>
</div>

      
    </>
  );
};

export default SignupPage;
