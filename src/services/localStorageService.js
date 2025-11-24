
/**
 * Obtiene la clave del carrito para el usuario actual
 */
const getCartKey = (userEmail) => {
  if (!userEmail) return null;
  return `caribeSupplyCart_${userEmail}`;
};

/**
 * Obtiene el carrito del usuario actual
 */
export const getCart = (userEmail) => {
  const key = getCartKey(userEmail);
  if (!key) return [];
  const cart = localStorage.getItem(key);
  return cart ? JSON.parse(cart) : [];
};

/**
 * Guarda el carrito del usuario actual
 */
export const saveCart = (userEmail, cart) => {
  const key = getCartKey(userEmail);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(cart));
};

/**
 * Limpia el carrito del usuario actual
 */
export const clearCart = (userEmail) => {
  const key = getCartKey(userEmail);
  if (key) localStorage.removeItem(key);
};