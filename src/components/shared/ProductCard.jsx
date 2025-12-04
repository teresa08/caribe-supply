import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const image = product.image && product.image.startsWith('http') ? product.image : (product.image ? `https://teresa08.github.io/caribe-supply/images${product.image}` : 'https://via.placeholder.com/400x300?text=Sin+imagen');
  return (
    <Card sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column', transition: '0.25s', '&:hover': { transform: 'translateY(-6px) scale(1.02)', boxShadow: 8 } }}>
      <CardMedia component="img" height="180" image={image} alt={product.name} sx={{ objectFit: 'cover' }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{product.category || 'General'}</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>${Number(product.price).toFixed(2)}</Typography>
        {product.description && <Typography variant="body2" sx={{ mt: 1 }}>{product.description}</Typography>}
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth onClick={() => addToCart(product)}>Añadir</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
