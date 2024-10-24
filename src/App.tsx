import React, { useState } from 'react';
import { Menu as MenuIcon, ShoppingCart, Home } from 'lucide-react';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  video?: string;
  ingredients: string[];
  allergens: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  comment?: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'cart'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, quantity: number = 1, comment?: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity, comment }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateComment = (id: number, comment: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, comment } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-red-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tasty Bites</h1>
          <div className="flex space-x-4">
            <button onClick={() => setCurrentPage('home')} className="flex items-center">
              <Home size={24} className="mr-1" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button onClick={() => setCurrentPage('menu')} className="flex items-center">
              <MenuIcon size={24} className="mr-1" />
              <span className="hidden sm:inline">Menu</span>
            </button>
            <button onClick={() => setCurrentPage('cart')} className="flex items-center">
              <ShoppingCart size={24} className="mr-1" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="bg-white text-red-600 rounded-full px-2 ml-1 text-sm">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'menu' && <MenuPage addToCart={addToCart} />}
        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            updateComment={updateComment}
          />
        )}
      </main>
    </div>
  );
};

export default App;