
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
      <img
        src={product.image.startsWith('http') ? product.image : `/images${product.image}`}
        alt={product.name}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/250?text=Sin+imagen')}
        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>${product.price.toFixed(2)}</strong></p>
      <button
        onClick={() => onAddToCart(product)}
        style={{
          marginTop: '0.5rem',
          padding: '0.4rem 0.8rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;