import react, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
export function Register(){

   const [form, setForm] = useState({
    full_name: '',
    mobile: '',
    email: '',
    password: '',
    role:''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5087/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        console.log('Invalid JSON response');
      }

      console.log('Status:', response.status);       // debug
    console.log('Response data:', data);           // debug

      if (!response) {
        throw new Error(data.message || 'Registration failed!!!');
      }

      setSuccess(data.message || 'Registration successful!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div >
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile No."
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
          <a className="inputLogin" href="/">Login</a>
        </form>
      </div>
    </div>
  );
};
