// src/components/shared/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Input
} from '@mui/material';

/** Componente de formulario para añadir/editar productos.
 */
export default function ProductForm({ open, onClose, onSave, initialProduct = null }) {
  // Estado del producto (controlado)
  const [product, setProduct] = useState(() => {
    if (initialProduct) {
      return {
        id: initialProduct.id || undefined,
        name: initialProduct.name || '',
        price: initialProduct.price ?? '',
        category: initialProduct.category || '',
        description: initialProduct.description || '',
        image: initialProduct.image || ''
      };
    }
    return { name: '', price: '', category: '', description: '', image: '' };
  });

  // Estado para manejo de imagen local (previsualización y archivo original)
  const [localImageFile, setLocalImageFile] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Reset del formulario cuando se abre o cambia el producto inicial
  useEffect(() => {
    if (open) {
      if (initialProduct) {
        setProduct({
          id: initialProduct.id || undefined,
          name: initialProduct.name || '',
          price: initialProduct.price ?? '',
          category: initialProduct.category || '',
          description: initialProduct.description || '',
          image: initialProduct.image || ''
        });
      } else {
        setProduct({ name: '', price: '', category: '', description: '', image: '' });
      }
      // limpiar selección local
      setLocalImageFile(null);
      if (localImageUrl) URL.revokeObjectURL(localImageUrl);
      setLocalImageUrl('');
    }
  }, [initialProduct, open]);

  // Limpieza de la URL de objeto al desmontar/cambiar
  useEffect(() => {
    return () => {
      if (localImageUrl) URL.revokeObjectURL(localImageUrl);
    };
  }, [localImageUrl]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLocalImageFile(file);
      if (localImageUrl) URL.revokeObjectURL(localImageUrl);
      setLocalImageUrl(URL.createObjectURL(file)); // solo previsualización local
    } else {
      setLocalImageFile(null);
      if (localImageUrl) URL.revokeObjectURL(localImageUrl);
      setLocalImageUrl('');
    }
  };

  /**
   * Helpers: compresión y conversión a Data URL
   */

  // Redimensiona y comprime la imagen usando canvas.
  // maxWidth / maxHeight controlan el tamaño máximo final.
  const compressImage = async (
    file,
    { quality = 0.8, type = 'image/jpeg', maxWidth = 1024, maxHeight = 1024 } = {}
  ) => {
    // Usa createImageBitmap si está disponible (moderno); de lo contrario, fallback a <img>
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      bitmap = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    }

    // Calcula escala manteniendo proporciones
    const ratio = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
    const width = Math.round(bitmap.width * ratio);
    const height = Math.round(bitmap.height * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
    // Renombra a .jpg si corresponde
    const newName = file.name.replace(/\.\w+$/, '.jpg');
    return new File([blob], newName, { type });
  };

  // Convierte File -> Data URL (base64)
  const fileToDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // "data:image/jpeg;base64,..."
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Estima bytes del base64 a partir del Data URL
  const estimateBase64Bytes = (dataUrl) => {
    const base64 = (dataUrl.split('base64,')[1] || '');
    return Math.ceil((base64.length * 3) / 4);
  };

  const handleSubmit = async () => {
    if (!product.name) {
      console.warn('El nombre del producto es obligatorio.');
      return;
    }

    setSaving(true);
    try {
      let imageField = product.image; // si el usuario pegó una URL pública, se queda así

      if (localImageFile) {
        // 1) Redimensionar/Comprimir (JPEG)
        const toUpload = await compressImage(localImageFile, {
          quality: 0.8,
          type: 'image/jpeg',
          maxWidth: 1024,
          maxHeight: 1024
        });

        // 2) Convertir a Data URL
        const dataUrl = await fileToDataURL(toUpload);

        // 3) Validar tamaño aproximado del base64 (margen de seguridad 0.9 MiB)
        const bytes = estimateBase64Bytes(dataUrl);
        const oneMiB = 1024 * 1024;
        if (bytes > Math.floor(0.9 * oneMiB)) {
          alert(
            'La imagen (aunque comprimida) es muy grande para guardarla como Data URL en Firestore (≈ 1 MiB/doc). ' +
            'Reduce el tamaño o la calidad y vuelve a intentar.'
          );
          setSaving(false);
          return;
        }

        imageField = dataUrl;
      }

      // price a número seguro
      const numericPrice = Number(product.price);
      const price = Number.isFinite(numericPrice) ? numericPrice : 0;

      // Pasa los datos al padre para que guarde en Firestore (upsert)
      await onSave({
        ...product,
        price,
        image: imageField, // Data URL o URL pública
      });

      onClose();
    } catch (err) {
      console.error('Error al guardar producto:', err);
      alert('No se pudo guardar el producto. Revisa la consola para más detalles.');
    } finally {
      setSaving(false);
    }
  };

  const dialogTitle = initialProduct ? 'Editar Producto' : 'Registrar Nuevo Producto';
  const previewImage = localImageUrl || product.image || 'https://via.placeholder.com/100';

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Nombre"
          fullWidth
          margin="dense"
          value={product.name}
          onChange={handleChange}
        />

        <TextField
          name="price"
          label="Precio"
          type="number"
          fullWidth
          margin="dense"
          value={product.price}
          onChange={handleChange}
        />

        <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
          <img
            src={previewImage}
            alt="Previsualización"
            style={{ maxWidth: '150px', maxHeight: '150px', border: '1px solid #ccc' }}
          />
        </div>

        <Button variant="contained" component="label" sx={{ mt: 1, mb: 1 }}>
          Seleccionar Imagen Local
          <Input
            type="file"
            name="imageFile"
            hidden
            accept="image/*"
            onChange={handleFileChange}
            // Permite re-seleccionar el mismo archivo forzando onChange
            onClick={(event) => {
              event.target.value = null;
            }}
          />
        </Button>

        {localImageFile && (
          <p style={{ fontSize: '0.85rem', color: 'gray' }}>
            Archivo seleccionado: {localImageFile.name}
          </p>
        )}

        <TextField
          name="image"
          label="Imagen (URL Pública)"
          fullWidth
          margin="dense"
          value={product.image}
          onChange={handleChange}
        />
        <p style={{ fontSize: '0.75rem', color: 'gray' }}>
          Puedes subir una imagen local <b>(se guardará como Data URL base64)</b> o proporcionar una URL pública.
        </p>

        <TextField
          name="category"
          label="Categoría"
          fullWidth
          margin="dense"
          value={product.category}
          onChange={handleChange}
        />

        <TextField
          name="description"
          label="Descripción"
          fullWidth
          margin="dense"
          multiline
          rows={2}
          value={product.description}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
