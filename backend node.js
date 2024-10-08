const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Almacenamiento de productos en memoria (simulando una base de datos)
let products = [
  { id: 1, name: 'Stormtrooper', price: 60, image: 'url-a-imagen-1' },
  { id: 2, name: 'Game Boy Classic', price: 60, image: 'url-a-imagen-2' },
];

// Ruta GET para obtener todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// Ruta POST para agregar un nuevo producto
app.post('/products', (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ error: 'Por favor, envía todos los datos del producto.' });
  }

  const newProduct = {
    id: products.length + 1,  // Generar un nuevo ID
    name,
    price,
    image
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Ruta DELETE para eliminar un producto por ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();  // 204 significa que fue exitoso, pero no hay contenido que devolver
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
