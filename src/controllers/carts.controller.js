import express from 'express'
const router = express.Router();

// Importa el servicio del carrito (debes definirlo o ajustar el import según tu estructura)
const cartService = require('../services/cart-service');

// Ruta para ver el contenido del carrito
router.get('/cart', (req, res) => {
  // Recupera el carrito del usuario actual desde el servicio
  const userCart = cartService.getUserCart(req.user.id); // Suponemos que el usuario está autenticado

  res.render('cart', { cart: userCart }); // Renderiza una vista con el contenido del carrito
});

// Ruta para agregar un producto al carrito
router.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body;

  // Valida los datos del producto a agregar (puedes agregar más validaciones)
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Falta información del producto o cantidad.' });
  }

  // Agrega el producto al carrito del usuario actual
  const result = cartService.addToCart(req.user.id, productId, quantity); // Suponemos que el usuario está autenticado

  if (result) {
    return res.status(200).json({ message: 'Producto agregado al carrito con éxito.' });
  } else {
    return res.status(500).json({ error: 'No se pudo agregar el producto al carrito.' });
  }
});

// Ruta para vaciar el carrito
router.delete('/cart/clear', (req, res) => {
  // Limpia el carrito del usuario actual
  cartService.clearCart(req.user.id); // Suponemos que el usuario está autenticado

  return res.status(200).json({ message: 'Carrito vaciado con éxito.' });
});

module.exports = router;
