// shopping-frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/products', newProduct)
      .then(response => setProducts([...products, response.data]));
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="name" value={newProduct.name} onChange={handleChange} placeholder="Name" />
        <input name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" />
        <input name="description" value={newProduct.description} onChange={handleChange} placeholder="Description" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default App;

