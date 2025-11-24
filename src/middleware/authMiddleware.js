
/**
 * Verifica si el usuario está autenticado.
 * @returns {boolean} true si está logueado, false en caso contrario.
 */
export const isAuthenticated = () => {
  const user = localStorage.getItem('caribeSupplyUser');
  return user !== null;
};

/**
 * Middleware para proteger rutas.
 * Redirige al login si no está autenticado.
 * @param {Function} navigate - Hook de navegación de React Router.
 * @param {string} redirectTo - Ruta a la que redirigir si no está autenticado.
 */
export const requireAuth = (navigate, redirectTo = '/login') => {
  if (!isAuthenticated()) {
    navigate(redirectTo, { replace: true });
    return false;
  }
  return true;
};