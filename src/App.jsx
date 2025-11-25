
import React, { useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Weather from './pages/Weather';
import ExchangeRates from './pages/ExchangeRates';
import Logistics from './pages/Logistics';
import Support from './pages/Support';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppContent() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="/clima" element={<Weather />} />
          <Route path="/tasas" element={<ExchangeRates />} />
          <Route path="/logistica" element={<Logistics />} />
          <Route path="/soporte" element={<Support />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;