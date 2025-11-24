import React, { useState, useEffect, useContext } from 'react';
import { fetchProducts } from '../services/api/catalogAPI';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/shared/ProductCard';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    fetchProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Nuestros Productos</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;