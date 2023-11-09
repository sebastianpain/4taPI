import { Router } from 'express';
const router = Router();

// Importa el servicio de productos (debes definirlo o ajustar el import según tu estructura)

import { productService } from '../services/product-service'
// Ruta para listar todos los productos
router.get('/products', (req, res) => {
  // Obtiene la lista de productos desde el servicio
  const products = productService.getAllProducts();

  res.render('products', { products }); // Renderiza una vista con la lista de productos
});

// Ruta para ver los detalles de un producto específico
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;

  // Obtiene los detalles del producto por su ID desde el servicio
  const product = productService.getProductById(productId);

  if (product) {
    res.render('product-details', { product }); // Renderiza una vista con los detalles del producto
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para crear un nuevo producto (administrador)
router.post('/products/create', (req, res) => {
  // Valida si el usuario tiene permisos de administrador
  if (req.user.isAdmin) {
    const { name, description, price } = req.body;

    // Valida los datos del producto (puedes agregar más validaciones)
    if (!name || !description || !price) {
      return res.status(400).json({ error: 'Falta información del producto.' });
    }

    // Crea un nuevo producto utilizando el servicio
    const newProduct = productService.createProduct({ name, description, price });

    return res.status(201).json(newProduct);
  } else {
    return res.status(403).json({ error: 'No tienes permisos de administrador.' });
  }
});

// Ruta para actualizar los detalles de un producto (administrador)
router.put('/products/:id/update', (req, res) => {
  // Valida si el usuario tiene permisos de administrador
  if (req.user.isAdmin) {
    const productId = req.params.id;
    const { name, description, price } = req.body;

    // Valida los datos del producto (puedes agregar más validaciones)
    if (!name || !description || !price) {
      return res.status(400).json({ error: 'Falta información del producto.' });
    }

    // Actualiza los detalles del producto utilizando el servicio
    const updatedProduct = productService.updateProduct(productId, { name, description, price });

    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } else {
    return res.status(403).json({ error: 'No tienes permisos de administrador.' });
  }
});

// Ruta para eliminar un producto (administrador)
router.delete('/products/:id/delete', (req, res) => {
  // Valida si el usuario tiene permisos de administrador
  if (req.user.isAdmin) {
    const productId = req.params.id;

    // Elimina el producto utilizando el servicio
    const deletedProduct = productService.deleteProduct(productId);

    if (deletedProduct) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } else {
    return res.status(403).json({ error: 'No tienes permisos de administrador.' });
  }
});

module.exports = router;
