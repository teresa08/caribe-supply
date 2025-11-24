import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      padding: '2rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>Bienvenido a CaribeSupply S.A.S.</h1>
      
      <p style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.1rem'
      }}>
        Conectamos artesanos, productores locales y microempresas dominicanas con clientes nacionales e internacionales.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        justifyContent: 'center',
        // maxWidth: '1200px',
         maxWidth: '100%',
        margin: '0 auto'
      }}>
        <Link to="/catalog" style={buttonStyle}>
          🛒 Explorar Productos
        </Link>
        <Link to="/clima" style={buttonStyle}>
          🌤️ Clima por Provincia
        </Link>
        <Link to="/tasas" style={buttonStyle}>
          💱 Tasas de Cambio
        </Link>
        <Link to="/logistica" style={buttonStyle}>
          🚚 Seguimiento Logístico
        </Link>
        <Link to="/soporte" style={buttonStyle}>
          ❓ Soporte / FAQ
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  display: 'block',
  padding: '1rem 1.5rem',
  backgroundColor: '#4c6ef5',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  transition: 'background 0.2s ease',
  fontSize: '1.1rem'
};

buttonStyle[':hover'] = {
  backgroundColor: '#365bdf'
};

export default Home;