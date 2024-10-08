// Obtener el contenedor de productos
const productsContainer = document.getElementById('products-container');

// Datos de ejemplo (vacíos inicialmente)
let products = [];

// Función para obtener los productos (GET)
function fetchProducts() {
    fetch('http://localhost:3000/products') // Reemplaza con la URL de tu servidor
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Función para renderizar los productos en el DOM
function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="deleteProduct(${index})">Eliminar</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Función para agregar un producto (POST)
function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    const newProduct = { name, price, image };

    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => response.json())
    .then(data => {
        products.push(data);
        renderProducts();
        clearForm();
    })
    .catch(error => console.error('Error adding product:', error));
}

// Función para eliminar un producto (DELETE)
function deleteProduct(index) {
    const productId = products[index].id;

    fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE'
    })
    .then(() => {
        products.splice(index, 1);
        renderProducts();
    })
    .catch(error => console.error('Error deleting product:', error));
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
}

// Evento para añadir un producto
document.getElementById('addProductBtn').addEventListener('click', addProduct);

// Inicializar productos
fetchProducts();
