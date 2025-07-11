import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5087/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();
      console.log('Login response:', data); 

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/userdetails');
      } else {
        setError('Token not found in response');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network or server error');
    }
  };

  return (
    <section className='page-content'>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
       <a className="inputLogin" href="/register">Register</a>
      </form>
    </div>
    </section>
  );
}
