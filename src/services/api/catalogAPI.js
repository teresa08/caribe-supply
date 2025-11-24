import products from '../../data/products.json';

/**
 * Obtiene todos los productos.
 * @returns {Array} Lista de productos.
 */
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 300); // Simula carga asíncrona
  });
};

/**
 * Obtiene un producto por ID.
 * @param {string} id
 * @returns {Object | undefined}
 */
export const getProductById = (id) => {
  return products.find(p => p.id === id);
};