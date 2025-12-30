import React, { useState } from 'react';
import './App.css';

// Sample product data
const productsData = [
  { id:1, name: 'Wireless Headphones', price: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', category:'Electronics' },
   { id: 2, name: 'Smart Watch', price: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', category: 'Electronics' },
  { id: 3, name: 'Running Shoes', price: 3499, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', category: 'Fashion' },
  { id: 4, name: 'Backpack', price: 1999, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', category: 'Fashion' },
  { id: 5, name: 'Water Bottle', price: 499, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300', category: 'Fitness' },
  { id: 6, name: 'Yoga Mat', price: 899, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300', category: 'Fitness' },
  { id: 7, name: 'Coffee Maker', price: 5999, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300', category: 'Home' },
  { id: 8, name: 'Table Lamp', price: 1499, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300', category: 'Home' }
];

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // add to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if(existingItem) {
      // Increase Quantity
      setCart(cart.map(item => 
        item.id === product.id
        ? {...item, quantity: item.quantity + 1}
        : item
      ));
    } else {
      // Add new item
      setCart([...cart, { ...product, quantity: 1}]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // update quantity 
  const updateQuantity = (productId, newQuantity) => {
    if(newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId
        ? {...item, quantity: newQuantity } 
        : item
      ));
    }
  };

  // Calculate total
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Filter products
  const categories = ['All', ...new Set(productsData.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' ? productsData : productsData.filter(p => p.category === selectedCategory);

  return (
    <div className='App'>
      <header className='header'>
        <h1>🛒 Shop Now</h1>
        <div className='cart-summary'>
          <span className='cart-icon'>🛍️</span>
          <span className='cart-count'>{cart.length}</span>
          <span className='cart-total'>₹{getTotal()}</span>
        </div>
      </header>

      <div className='container'>
        {/* Filter */}
        <div className='filters'>
          <h3>categories</h3>
          {categories.map(category => (
            <button 
               key={category}
               className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
               onClick={() => setSelectedCategory(category)}
               >
                {category}
               </button>
          ))}
        </div>

        {/* Products */}
        <div className='main-content'>
          <div className='products-grid'>
            {filteredProducts.map(product => (
              <ProductCard
                 key={product.id}
                 product={product}
                 onAddToCart={addToCart}
                 />
            ))}
          </div>

          {/* Cart */}
          {cart.length > 0 && (
            <div className='cart'>
              <h2>Shopping Cart ({cart.length} items)</h2>
                 {cart.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                />
          ))}
          <div className='cart-total'>
            <h3>Total: ₹{getTotal()}</h3>
            <button className='checkout-btn'>Proceed to checkout</button>
        </div>
      </div>
  )}
    </div>
    </div>
    </div>
  );
}

// Product Card componet
function ProductCard({product, onAddToCart}) {
  return (
    <div className='product-card'>
      <img src={product.image} alt={product.name} />
      <div className='product-info'>
         <span className='category'>{product.category}</span>
         <h3>{product.name}</h3>
         <p className='price'>₹{product.price}</p>
         <button className='add-btn' onClick={() => onAddToCart(product)}>
          Add to Cart
         </button>
      </div>
    </div>
  );
}

// Cart Item Componet
function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className='cart-item'>
      <img src={item.image} alt={item.name} />
      <div className='cart-item-info'>
        <h4>{item.name}</h4>
        <p className='price'>₹{item.price}</p>
      </div>
      <div className='quantity-controls'>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <p className='item-total'>₹{item.price * item.quantity}</p>
      <button className='remove-btn' onClick={() => onRemove(item.id)}>✕</button>
    </div>
  );
}

export default App;