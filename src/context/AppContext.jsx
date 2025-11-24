
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as authLogout } from '../services/api/authAPI';
import { getCart, saveCart, clearCart } from '../services/localStorageService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedUser = getCurrentUser();
    setUser(storedUser);

    if (storedUser) {
      const savedCart = getCart(storedUser.email);
      setCart(savedCart);
    } else {
      setCart([]);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('caribeSupplyUser', JSON.stringify(userData));
    // Al iniciar sesión, cargar su carrito
    const savedCart = getCart(userData.email);
    setCart(savedCart);
  };

  const logout = () => {
    if (user) {
      // Opcional: guardar el carrito actual antes de salir
      saveCart(user.email, cart);
    }
    authLogout();
    setUser(null);
    setCart([]);
  };

  const addToCart = (product) => {
    if (!user) {
      // Opcional: redirigir a login, o permitir carrito anónimo
      // Pero según tu mandato, carrito es post-login
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      saveCart(user.email, updated);
      return updated;
    });
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    if (user) saveCart(user.email, updated);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updated);
    if (user) saveCart(user.email, updated);
  };

  const clearUserCart = () => {
    if (user) {
      clearCart(user.email);
      setCart([]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart: clearUserCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};