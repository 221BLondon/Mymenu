import React, { useState } from 'react';
import { Menu as MenuIcon, ShoppingCart, Home, ClipboardList, Settings } from 'lucide-react';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';
import OrdersPage from './components/OrdersPage';
import AdminPage from './components/AdminPage';

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
  category: string;
  spicyLevel?: 1 | 2 | 3;
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  comment?: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  total: number;
  date: Date;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Chicken Curry',
    description: 'Tender chicken pieces cooked in a rich, aromatic curry sauce with traditional Indian spices.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ingredients: ['Chicken', 'Onions', 'Tomatoes', 'Ginger', 'Garlic', 'Garam Masala'],
    allergens: ['Dairy', 'Mustard'],
    category: 'Main Course',
    spicyLevel: 2
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy thin crust.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    ingredients: ['Pizza Dough', 'Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil'],
    allergens: ['Gluten', 'Dairy'],
    category: 'Pizza',
    dietary: ['vegetarian']
  },
  {
    id: 3,
    name: 'Spicy Thai Basil Tofu',
    description: 'Crispy tofu stir-fried with Thai basil, chilies, and vegetables in a savory sauce.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512003867696-6d5ce6835040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587254280184-4d60b8c5f2da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    ingredients: ['Tofu', 'Thai Basil', 'Chilies', 'Garlic', 'Soy Sauce', 'Bell Peppers'],
    allergens: ['Soy'],
    category: 'Main Course',
    spicyLevel: 3,
    dietary: ['vegetarian', 'vegan']
  },
  {
    id: 4,
    name: 'Mediterranean Quinoa Bowl',
    description: 'Fresh and healthy bowl with quinoa, roasted vegetables, hummus, and tahini dressing.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    ingredients: ['Quinoa', 'Chickpeas', 'Sweet Potato', 'Kale', 'Hummus', 'Tahini'],
    allergens: ['Sesame'],
    category: 'Bowls',
    dietary: ['vegetarian', 'vegan', 'gluten-free']
  },
  {
    id: 5,
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce on a brioche bun.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    ingredients: ['Beef Patty', 'Brioche Bun', 'Lettuce', 'Tomato', 'Cheddar', 'Special Sauce'],
    allergens: ['Gluten', 'Dairy', 'Egg'],
    category: 'Burgers'
  },
  {
    id: 6,
    name: 'Green Goddess Salad',
    description: 'Fresh mixed greens with avocado, cucumber, seeds, and herb dressing.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    ingredients: ['Mixed Greens', 'Avocado', 'Cucumber', 'Pumpkin Seeds', 'Herbs', 'Olive Oil'],
    allergens: [],
    category: 'Salads',
    dietary: ['vegetarian', 'vegan', 'gluten-free']
  },
  {
    id: 7,
    name: 'Spicy Ramen',
    description: 'Rich pork broth with fresh noodles, chashu pork, soft-boiled egg, and vegetables.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    ingredients: ['Ramen Noodles', 'Pork Broth', 'Chashu Pork', 'Egg', 'Green Onions', 'Bamboo Shoots'],
    allergens: ['Gluten', 'Egg', 'Soy'],
    category: 'Noodles',
    spicyLevel: 2
  },
  {
    id: 8,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    ],
    ingredients: ['Chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla Ice Cream'],
    allergens: ['Gluten', 'Dairy', 'Egg'],
    category: 'Desserts',
    dietary: ['vegetarian']
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'cart' | 'orders' | 'admin'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

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
        {currentPage === 'home' && <HomePage />}
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
          <AdminPage menuItems={menuItems} />
        )}
      </main>
    </div>
  );
};

export default App;