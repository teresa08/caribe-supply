
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '2rem 0',
      borderTop: '1px solid #333',
      textAlign: 'center',
      width: '100%', 
      marginTop: '3rem'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/soporte" style={linkStyle}>Soporte</Link>
        <Link to="/clima" style={linkStyle}>Clima</Link>
        <Link to="/tasas" style={linkStyle}>Tasas</Link>
        <Link to="/logistica" style={linkStyle}>Logística</Link>
      </div>
      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} CaribeSupply S.A.S. — República Dominicana
      </p>
      <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
        Conectando artesanos locales con el mundo.
      </p>
    </footer>
  );
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none',
  margin: '0 1rem',
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'color 0.2s'
};

linkStyle[':hover'] = { color: '#0056b3' };

export default Footer;