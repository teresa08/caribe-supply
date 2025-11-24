
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { login as authLogin } from '../services/api/authAPI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = authLogin(email, password);
    if (result.success) {
      login(result.user);
      navigate('/catalog');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: '#1a1a1a',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      color: 'white'
    }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Iniciar Sesión</h2>

      {error && (
        <div role="alert" style={{
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#2d2d2d',
              color: 'white'
            }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #444',
              backgroundColor: '#2d2d2d',
              color: 'white'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Iniciar Sesión
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        ¿No tienes cuenta? <Link to="/register" style={{ color: '#007bff', textDecoration: 'underline' }}>Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;