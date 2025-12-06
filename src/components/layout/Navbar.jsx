import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { CartContext } from '../../context/CartContext'; // <-- ¡Añade esta importación!
import ThemeToggle from '../shared/ThemeToggle';

const Navbar = () => {
  // Desestructura 'user' y 'logout' del AppContext
  const { user, logout } = useContext(AppContext);
  // Desestructura 'cart' del CartContext
  const { cart } = useContext(CartContext); // <-- ¡Modifica esta línea!

  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const navStyle = {
    backgroundColor: '#003366',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    boxSizing: 'border-box'
  };

  const brandStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background 0.2s ease',
    fontSize: '1rem',
    fontWeight: '500'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#0055aa',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    background: 'none',
    border: '1px solid white',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background 0.2s ease'
  };

  const renderAuthLinks = () => {
    // Calcula la cantidad total de artículos o la suma de las cantidades
    // Si quieres el número de productos únicos: cart.length
    // Si quieres la suma de las cantidades de cada producto:
    const totalItemsInCart = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    if (user) {
      return (
        <>
          <Link
            to="/cart"
            style={location.pathname === '/cart' ? activeLinkStyle : linkStyle}
          >
            🛒 Carrito ({totalItemsInCart}) {/* <-- ¡Usa totalItemsInCart aquí! */}
          </Link>
          <Link
            to="/checkout"
            style={location.pathname === '/checkout' ? activeLinkStyle : linkStyle}
          >
            💳 Checkout
          </Link>
          <button onClick={handleLogout} style={buttonStyle}>
            Cerrar Sesión
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link
            to="/login"
            style={location.pathname === '/login' ? activeLinkStyle : linkStyle}
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            style={location.pathname === '/register' ? activeLinkStyle : linkStyle}
          >
            Registrarse
          </Link>
        </>
      );
    }
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={brandStyle}>CaribeSupply</Link>
        <Link
          to="/catalog"
          style={location.pathname === '/catalog' ? activeLinkStyle : linkStyle}
        >
          Catálogo
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {renderAuthLinks()}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
