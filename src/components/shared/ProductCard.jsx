// src/components/shared/ProductCard.jsx
import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { CartContext } from '../../context/CartContext';

// Añadimos una prop `onDelete`
const ProductCard = ({ product, onEdit, onDelete }) => {
  const { addToCart } = useContext(CartContext);

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(product.id); // Pasa el ID del producto a eliminar
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || 'https://via.placeholder.com/150'} // Fallback si no hay imagen
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price ? product.price.toFixed(2) : '0.00'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Categoría: {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEditClick}>Editar</Button>
        <Button size="small" color="error" onClick={handleDeleteClick}>Eliminar</Button> {/* Botón de eliminar */}
        <Button size="small" onClick={() => addToCart(product)}>Añadir al Carrito</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
