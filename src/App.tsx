import React, { useState } from 'react';
import { Menu as MenuIcon, ShoppingCart, Home, ClipboardList, Settings } from 'lucide-react';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';
import OrdersPage from './components/OrdersPage';
import AdminPage from './components/AdminPage';
import { CartItem, MenuItem, Order, RestaurantSettings } from './types';
import { menuItems } from './data/menuItems';
import { defaultSettings } from './data/defaultSettings';

type PageType = 'home' | 'menu' | 'cart' | 'orders' | 'admin';

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<RestaurantSettings>(defaultSettings);

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

  const placeOrder = (customerName: string) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName,
      items: [...cart],
      total,
      date: new Date(),
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCart([]);
    setCurrentPage('orders');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const updateSettings = (newSettings: RestaurantSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-red-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{settings.name}</h1>
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
            <button onClick={() => setCurrentPage('orders')} className="flex items-center">
              <ClipboardList size={24} className="mr-1" />
              <span className="hidden sm:inline">Orders</span>
            </button>
            <button onClick={() => setCurrentPage('admin')} className="flex items-center">
              <Settings size={24} className="mr-1" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {currentPage === 'home' && <HomePage settings={settings} />}
        {currentPage === 'menu' && <MenuPage addToCart={addToCart} menuItems={menuItems} />}
        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            updateComment={updateComment}
            onCheckout={placeOrder}
          />
        )}
        {currentPage === 'orders' && (
          <OrdersPage orders={orders} onDeleteOrder={deleteOrder} />
        )}
        {currentPage === 'admin' && (
          <AdminPage 
            menuItems={menuItems}
            settings={settings}
            onUpdateSettings={updateSettings}
          />
        )}
      </main>
    </div>
  );
};

export default App;