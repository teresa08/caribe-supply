import React, { createContext, useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import { getCart, saveCart, clearCart as clearCartLS } from "../services/localStorageService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AppContext); // <- traemos el usuario
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "" });

  // Cargar carrito cuando el usuario cambie
  useEffect(() => {
    if (user) {
      const savedCart = getCart(user.email);
      setCart(savedCart);
    } else {
      setCart([]); // si no hay usuario, carrito vacío
    }
  }, [user]);

  // Guardar carrito automáticamente si cambia y el usuario existe
  useEffect(() => {
    if (user) {
      saveCart(user.email, cart);
    }
  }, [cart, user]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    if (!user) {
      setAlert({ open: true, message: "Debes iniciar sesión para agregar al carrito" });
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setAlert({ open: true, message: `Cantidad de ${product.name} actualizada` });
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
        setAlert({ open: true, message: `${product.name} agregado al carrito` });
      }

      return updated;
    });
  };

  // Eliminar producto
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Modificar cantidad
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Vaciar carrito del usuario actual
  const clearCart = () => {
    if (user) {
      clearCartLS(user.email);
    }
    setCart([]);
    setAlert({ open: true, message: "Carrito vaciado" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        alert,
        setAlert,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
