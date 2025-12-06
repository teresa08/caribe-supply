import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '' });

  const addToCart = (product) => {
    // Si el producto ya está en el carrito, incrementa la cantidad.
    // Si no, lo añade con cantidad 1.
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingProductIndex > -1) {
        // Producto ya existe, incrementa su cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: (updatedCart[existingProductIndex].quantity || 1) + 1,
        };
        setAlert({ open: true, message: `Cantidad de ${product.name} actualizada en el carrito` });
        return updatedCart;
      } else {
        // Producto nuevo, añade con cantidad 1
        setAlert({ open: true, message: `${product.name} agregado al carrito` });
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // removeFromCart actualizalo para que reciba el ID del producto si lo quieres usar así en Cart.jsx
  const removeFromCart = (productId) => { // CAMBIO: Recibe productId en lugar de index
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity >= 1 ? newQuantity : 1 } // Asegura que la cantidad sea al menos 1
          : item
      )
    );
  };


  const clearCart = () => {
    setCart([]);
    setAlert({ open: true, message: 'Carrito vaciado' });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, alert, setAlert }}>
      {children}
    </CartContext.Provider>
  );
};
